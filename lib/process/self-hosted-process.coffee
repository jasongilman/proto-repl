childProcess = require 'child_process'

DEFAULT_NS = "cljs.user"

module.exports=

class SelfHostedProcess

  # A set of functions for writing text to the REPL.
  replView: null

  currentNs: DEFAULT_NS

  constructor: (@replView)->
    null

  getType: ->
    "SelfHosted"

  start: (@replOptions)->
    return if @running()
    @currentNs = DEFAULT_NS
    projectPath = atom.project.getPaths()[0]

    processData = (data) =>
      lines = data.toString().split('\n')
      s = lines
            .map (l) -> l.replace(/^(\s*#_=> )+/, '')
            .filter (l) => l and not l.startsWith(@currentNs + '=>') and not l.startsWith('cljs.user=>')
            .join('\n')

      # Defer processing so that finishing prompt does not front-run error stream
      setTimeout (() =>
        if @responseBuffer
          @responseBuffer.push s

          # Command finishes when we get next prompt
          if lines.length > 0 and lines[lines.length - 1].startsWith(@currentNs + '=>')
            if @errorBuffer.length > 0
              result = @errorBuffer.join('')
              cb = @errorCb
            else
              result = @responseBuffer.join('')
              cb = @successCb
            @successCb = null
            @errorCb = null
            @responseBuffer = null
            @errorBuffer = null

            cb(result)
        else if s
          @replView.stdout s
      ), 0

    processDataErr = (data) =>
      if @errorBuffer
        @errorBuffer.push data.toString()
      else
        @replView.stderr data.toString()

    # Will this work on Windows?
    @replProcess = childProcess.spawn "lumo", ['-d'], cwd: projectPath, shell: true

    @replProcess.stderr.on 'data', processDataErr
    @replProcess.stdout.on 'data', processData

    @replProcess.on 'error', (error) ->
      @replProcess = null
      @replView.stderr("Error starting repl: " + error +
      "\nYou may need to configure the lein path in proto-repl settings\n")

    @replProcess.on 'close', (code) =>
      @replProcess = null
      @replView.stderr "Lumo repl stopped running (exit code #{code})\n"
      @replOptions.stopCallback()

    @replOptions.startCallback()

  # Evaluates the clojure code invoking successCb on success and errorCb on failure.
  eval: (code, successCb, errorCb)->
    if not @replProcess
      errorCb("Lumo repl is not running\n")
      return

    # Maybe we should use queueing to prevent evaling when a command is still running?
    @successCb = successCb
    @errorCb = errorCb
    @responseBuffer = []
    @errorBuffer = []

    @replProcess.stdin.write code + '\n'

  # Switches to the specified namespace. Calls successCb if successful and
  # errorCb if there was a problem.
  switchNs: (ns, successCb, errorCb)->
    @currentNs = ns
    @eval "(in-ns '#{ns})", successCb, errorCb

  getCurrentNs: ->
    @currentNs

  # Sends a command to the repl.
  # * code - string of clojure code to execute
  # * options - map of options
  #   * displayInRepl - false to display the result in repl. Defaults to true.
  #   * ns - the namespace to execute the code in.
  # * resultHandler - The result handler to handle the resulting value.
  sendCommand: (code, options, resultHandler)->
    successCb = (value)=>
      if options.displayInRepl != false
        @replOptions.messageHandler value: value
      resultHandler value: value

    errorHandler = (error)=>
      if options.displayInRepl != false
        @replOptions.messageHandler err: error
      resultHandler error: error

    if options.ns
      @switchNs options.ns, (()=> @eval(code, successCb, errorHandler)), errorHandler
    else
      @eval(code, successCb, errorHandler)

  interrupt: ->
    # doesn't do anything
    return null

  running: ()->
    @replProcess?

  # Closes the remote connection.
  stop: (session)->
    return unless @running()
    @replProcess.kill("SIGKILL")
    @replProcess = null
    @replOptions = null
    @replView.info("Self hosted REPL stopped")
