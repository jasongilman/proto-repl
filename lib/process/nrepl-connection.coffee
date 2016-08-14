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
  start: ({host, port, messageHandler, startCallback})->
    if @connected()
      @close()

    host ?= "localhost"
    @conn = nrepl.connect({port: port, host: host, verbose: false})
    messageHandlingStarted = false
    @currentNs = DEFAULT_NS

    # Handle and show errors
    @conn.on 'error', (err)=>
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
        @determineClojureVersion =>
          # Handle multiple callbacks for this which can happen during REPL startup
          # with cider-nrepl middleware for some reason.
          unless messageHandlingStarted
            @startMessageHandling(messageHandler)
            messageHandlingStarted = true

        # Create a session for requests that we don't want the values printed to
        # the repl.
        @conn.clone (err, messages)=>
          @cmdSession = messages[0]["new-session"]
          startCallback()

  determineClojureVersion: (callback)->
    @conn.eval "*clojure-version*", "user", @session, (err, messages)=>
      value = (msg.value for msg in messages)[0]
      @clojureVersion = new ClojureVersion(protoRepl.parseEdn(value))
      unless @clojureVersion.isSupportedVersion()
        atom.notifications.addWarning "WARNING: This version of Clojure is not supported by Proto REPL. You may experience issues.",
          dismissable: true
      callback()

  startMessageHandling: (messageHandler)->
    # Log any output from the nRepl connection messages
    @conn.messageStream.on "messageSequence", (id, messages)=>
      # Skip sending messages if the namespace isn't found.
      unless @namespaceNotFound(messages)
        for msg in messages

          # Set the current ns, but only if the message is in response
          # to something sent by the user through the REPL
          if msg.ns && msg.session == @session
            @currentNs = msg.ns

          if msg.session == @session
            messageHandler(msg)
          else if msg.session == @cmdSession && msg.out
            # I don't like that we have to have this much logic here about
            # what messages to send to the handler or not. We have to allow output
            # for the cmdSession though.
            messageHandler(msg)

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
          else
            for msg in messages
              if msg.value
                resultHandler(value: msg.value)
              else if msg.err
                resultHandler(error: msg.err)
        catch error
          console.error error
          atom.notifications.addError "Error in handler: " + error,
            detail: error, dismissable: true


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
