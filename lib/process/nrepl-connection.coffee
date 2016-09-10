nrepl = require('jg-nrepl-client')
ClojureVersion = require './clojure-version'
EditorUtils = require '../editor-utils'

DEFAULT_NS = "user"

module.exports =

class NReplConnection
  # The nrepl connection
  conn: null

  # The standard nREPL session
  session: null

  # a function that receives the messages from the nrepl to display them
  # on the console
  replMsgHandler: null

  # A separate nREPL session for sending commands in which we do not want the result
  # value sent to the REPL.
  cmdSession: null

  # A map of sessions to name. These are created on demand when needed.
  sessionsByName: {}

  clojureVersion: null

  currentNs: DEFAULT_NS

  constructor: ()->
    null

  # Starts the nREPL connection.
  start: ({host, port, @replMsgHandler, startCallback})->
    if @connected()
      @close()

    host ?= "localhost"
    @conn = nrepl.connect({port: port, host: host, verbose: false})
    @currentNs = DEFAULT_NS

    # Handle and show errors
    @conn.on 'error', (err)=>
      # Don't display the error if we're not connected.
      if @connected()
        atom.notifications.addError "proto-repl: connection error", detail: err, dismissable: true
      @conn = null

    @conn.once 'connect', =>
      # When repl connection closed
      @conn.on 'finish', =>
        @conn = null

      # Create a persistent session
      @conn.clone (err, messages)=>
        @session = messages[0]["new-session"]

        # Determine the Clojure Version
        @determineClojureVersion()

        # Create a session for requests that we don't want the values printed to
        # the repl.
        @conn.clone (err, messages)=>
          @cmdSession = messages[0]["new-session"]
          startCallback()

  determineClojureVersion: ()->
    @conn.eval "*clojure-version*", "user", @session, (err, messages)=>
      value = (msg.value for msg in messages)[0]
      @clojureVersion = new ClojureVersion(window.protoRepl.parseEdn(value))
      unless @clojureVersion.isSupportedVersion()
        atom.notifications.addWarning "WARNING: This version of Clojure is not supported by Proto REPL. You may experience issues.",
          dismissable: true

  # Returns true if the connection is open.
  connected: ->
    @conn != null

  getCurrentNs: ->
    @currentNs

  # Returns true if the code might have a reader conditional in it
  # Avoids unnecesary eval'ing for regular code.
  codeMayContainReaderConditional: (code)->
    code.includes("#?")

  # Wraps the given code in an eval and a read-string. This is required for
  # handling reader conditionals. http://clojure.org/guides/reader_conditionals
  wrapCodeInReadEval: (code)->
    if @clojureVersion?.isReaderConditionalSupported() && @codeMayContainReaderConditional(code)
      escapedStr = EditorUtils.escapeClojureCodeInString(code)
      "(eval (read-string {:read-cond :allow} #{escapedStr}))"
    else
      code

  # Returns true if any of the messages indicate the namespace wasn't found.
  namespaceNotFound: (messages)->
    for msg in messages
      if msg.status?.length > 0
        return true if msg.status[0] == "namespace-not-found"

  optionsToSession: (options, callback)->
    if options.session
      if s = @sessionsByName[options.session]
        callback(s)
      else
        @conn.clone (err, messages)=>
          s = messages[0]["new-session"]
          @sessionsByName[options.session] = s
          callback(s)
    else if options.displayInRepl == false
      callback(@cmdSession)
    else
      callback(@session)

  # Sends a command to the repl.
  # * code - string of clojure code to execute
  # * options - map of options
  #   * displayInRepl - false to display the result in repl. Defaults to true.
  #   * ns - the namespace to execute the code in.
  # * resultHandler - The result handler to handle the resulting value.
  sendCommand: (code, options, resultHandler)->
    return null unless @connected()

    @optionsToSession options, (session)=>
      # Wrap code in read eval to handle invalid code and reader conditionals
      wrappedCode = @wrapCodeInReadEval(code)
      ns = options.ns || @currentNs

      evalOptions = {op: "eval", code: wrappedCode, ns: ns, session: session}
      if options?.inlineOptions?.range?
        evalOptions.line = options.inlineOptions.range.start.row + 1
        evalOptions.column = options.inlineOptions.range.start.column + 1

      if options?.inlineOptions?.editor
        evalOptions.file = options.inlineOptions.editor.getPath()

      @conn.send evalOptions, (err, messages)=>
        try
          # If the namespace hasn't been defined this will fail. We redefine the Namespace
          # and retry.
          if @namespaceNotFound(messages)
            unless options.retrying
              options.retrying = true # Must set this to prevent a double retry.
              options.ns = @currentNs # Retry with current namespace.
              @sendCommand(code, options, resultHandler)
          else if messages.length == 1 and messages[0].ex?
            # ignore messages that only contain an exception
            # see: https://github.com/rksm/node-nrepl-client/pull/7
            return null
          else if messages[0].status?[0] is 'eval-error'
            # detect if the command sent resulted in an exception
            if options.inlineOptions && atom.config.get('proto-repl.showInlineResults')
              @redirectHandler(options, resultHandler)
          else
            for msg in messages
              # Set the current ns, but only if the message is in response
              # to something sent by the user through the REPL
              if msg.ns && msg.session == @session
                @currentNs = msg.ns

              # WARNING: If the command resulted in an error, we rely on
              # @redirectHandler to overwrite the msg before replMsgHandler
              # receives it
              if msg.value or msg.err or msg.ex
                resultHandler(msg)
              # I don't like that we have to have this much logic here about
              # what messages to send to the handler or not. We have to allow
              # output for the cmdSession though.
              if msg.session == @session or (msg.session == @cmdSession && msg.out)
                @replMsgHandler(msg)

        catch error
          console.error error
          atom.notifications.addError "Error in handler: " + error,
            detail: error, dismissable: true

  # this is a HACK: there be dragons !
  # we wrap the passed resultHandler with our own code to request the last
  # exception and return it as if that was the result of the command
  redirectHandler: (options, resultHandler) ->
    code = '(do (require \'[clojure.repl :as proto-repl-stack])
                (let [buff (new java.io.StringWriter)]
                  (binding [*err* buff]
                    (proto-repl-stack/pst))
                  (str buff)))'
    wrappedHandler = (msg) ->
      if msg.value?
        msg.ex = protoRepl.parseEdn(msg.value)
        msg.value = null
        resultHandler(msg)

    @sendCommand(code, options, wrappedHandler)

  interrupt: ->
    return null unless @connected()
    @conn.interrupt @session, (err, result)=>
      null
    @conn.interrupt @cmdSession, (err, result)=>
      null

  close: ->
    return null unless @connected()
    @conn.close @session, => return
    @conn.close @cmdSession, => return
    @sessionsByName = {}
    @conn = null
