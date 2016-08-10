self_hosted_clj = require '../proto_repl/proto_repl/self_hosted.js'
{allowUnsafeEval, allowUnsafeNewFunction} = require 'loophole'

DEFAULT_NS = "cljs.user"

module.exports=

# This is fake process that allows a self hosted ClojureScript REPL. The Related
# code is in edn-reader.self-hosted.
class SelfHostedProcess

  # A set of functions for writing text to the REPL.
  replView: null

  currentNs: DEFAULT_NS

  constructor: (@replView)->
    null

  getType: ->
    "SelfHosted"

  start: ({messageHandler, startCallback})->
    return if @running()
    @currentNs = DEFAULT_NS
    @messageHandler = messageHandler
    @startRedirectingConsoleOutput()
    startCallback()

  # Evaluates the clojure code invoking successCb on success and errorCb on failure.
  eval: (code, successCb, errorCb)->
    allowUnsafeEval =>
      allowUnsafeNewFunction =>
        # console.debug("Evaling", code)
        self_hosted_clj.eval_str code, (result)=>
          # console.debug("Result:", result)
          if result["success?"]
            successCb(result.value)
          else
            error = result.error.cause?.toString() ||
              result.error.toString()
            errorCb(error)

  # Switches to the specified namespace. Calls successCb if successful and
  # errorCb if there was a problem.
  switchNs: (ns, successCb, errorCb)->
    @eval "(in-ns '#{ns})",
      (()=>
        @currentNs = ns
        successCb()),
      ((error)-> errorCb(error))

  getCurrentNs: ->
    @currentNs

  # Sends a command to the repl.
  # * code - string of clojure code to execute
  # * options - map of options
  #   * displayInRepl - false to display the result in repl. Defaults to true.
  #   * ns - the namespace to execute the code in.
  # * resultHandler - The result handler to handle the resulting value.
  sendCommand: (code, options, resultHandler)->
    # beef up error responses. It currently returns
    # TypeError: Cannot read property 'call' of undefined at eval
    # if somewhere within the code you refer to a function that's not defined.

    # another problem is with defining functions that refer to vars that don't exists
    # There's no error until runtime. But with another user or replumb reepl they get compilation errors.
    successCb = (value)=>
      if options.displayInRepl != false
        @messageHandler value: value
      resultHandler value: value

    errorHandler = (error)=>
      if options.displayInRepl != false
        @messageHandler err: error
      resultHandler error: error

    if options.ns
      @switchNs options.ns, (()=> @eval(code, successCb, errorHandler)), errorHandler
    else
      @eval(code, successCb, errorHandler)

  interrupt: ->
    # doesn't do anything
    return null

  running: ()->
    @messageHandler?

  # Closes the remote connection.
  stop: (session)->
    return unless @running()
    @stopRedirectingConsoleOutput()
    @replView.info("Self hosted REPL stopped")

  # Redirects console.log and friends to the Proto REPL repl.
  startRedirectingConsoleOutput: ->
    if @originalLog
      console.log("Already redirecting logging")
      return
    else
      originalLog = console.log
      @originalLog = originalLog
      originalWarn = console.warn
      @originalWarn = originalWarn
      originalError = console.error
      @originalError = originalError

      protoLog = (text)=> @replView.info(text)
      protoWarn = (text)=> @replView.stderr(text)
      protoError = (text)=> @replView.stderr(text)

      console.log = ->
        args = Array.prototype.slice.call(arguments)
        protoLog(args.join(" "))
        originalLog.apply console, arguments
      console.warn = ->
        args = Array.prototype.slice.call(arguments)
        protoWarn(args.join(" "))
        originalWarn.apply console, arguments
      console.error = ->
        args = Array.prototype.slice.call(arguments)
        protoError(args.join(" "))
        originalError.apply console, arguments

  # Stops redirecting console.log and friends to the Proto REPL repl.
  stopRedirectingConsoleOutput: ->
    return unless @originalLog
    console.log = @originalLog
    console.warn = @originalWarn
    console.error = @originalError
