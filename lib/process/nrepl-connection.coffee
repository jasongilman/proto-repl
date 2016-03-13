nrepl = require('jg-nrepl-client')
ClojureVersion = require './clojure-version'
EditorUtils = require '../editor-utils'

module.exports =

class NReplConnection
  # The nrepl connection
  conn: null

  # The standard nREPL session
  session: null

  # A separate nREPL session for sending commands in which we do not want the result
  # value sent to the REPL.
  cmdSession: null

  clojureVersion: null

  currentNs: "user"

  constructor: ()->
    null

  # Starts the nREPL connection.
  start: ({host, port, messageHandler, startCallback})->
    if @connected()
      @close()

    host ?= "localhost"
    @conn = nrepl.connect({port: port, host: host, verbose: false})
    messageHandlingStarted = false

    @conn.once 'connect', =>

      # Handle and show errors
      @conn.on 'error', (err)=>
        atom.notifications.addError "proto-repl: connection error", detail: err, dismissable: true
        @conn = null

      # TODO we need an emitter
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
      for msg in messages

        # Set the current ns
        if msg.ns
          @currentNs = msg.ns

        if msg.session == @session
          messageHandler(msg)
        else if msg.session == @cmdSession && msg.out
          # TODO I don't like that we have to have this much logic here about
          # what messages to send to the handler or not. We have to allow output
          # for the cmdSession though.
          messageHandler(msg)

  # Returns true if the connection is open.
  connected: ->
    @conn != null

  # Wraps the given code in an eval and a read-string. This safely handles
  # unbalanced parentheses, other kinds of invalid code, and handling reader
  # conditionals. http://clojure.org/guides/reader_conditionals
  wrapCodeInReadEval: (code)->
    escapedStr = EditorUtils.escapeClojureCodeInString(code)
    if @clojureVersion?.isReaderConditionalSupported()
      "(eval (read-string {:read-cond :allow} #{escapedStr}))"
    else
      "(eval (read-string #{escapedStr}))"

  # Sends a command to the repl.
  # * code - string of clojure code to execute
  # * options - map of options
  #   * displayInRepl - false to display the result in repl. Defaults to true.
  #   * ns - the namespace to execute the code in.
  # * resultHandler - The result handler to handle the resulting value.
  sendCommand: (code, options, resultHandler)->
    return null unless @connected()

    if options.displayInRepl == false
      session = @cmdSession
    else
      session = @session

    # Wrap code in read eval to handle invalid code and reader conditionals
    code = @wrapCodeInReadEval(code)

    # TODO this is causing the REPL to change namespace after executing something
    # in another namespace.
    ns = options.ns || @currentNs

    @conn.eval code, ns, session, (err, messages)=>
      for msg in messages

        # TODO the namespace could be corrected here. or we could pass the Namespaces
        # as an additional message...?
        # Need to rethink when values are printed out and when the namespace
        # prompt is printed
        if msg.value
          resultHandler(value: msg.value)
        else if msg.err
          resultHandler(error: msg.err)

  interrupt: ->
    return null unless @connected()
    @conn.interrupt @session, (err, result)=>
      @appendText("interrupted")
    @conn.interrupt @cmdSession, (err, result)=>
      @appendText("interrupted")

  close: ->
    return null unless @connected()
    @conn.close @session, => return
    @conn.close @cmdSession, => return
    @conn = null
