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

  constructor: ()->
    null

  # TODO rename the response logging stuff. It should be message handling.


  # TODO document what the handler will be passed.
  start: ({host, port, messageHandler, startCallback})->
    if @connected()
      @close()

    host ?= "localhost"
    console.log("Connectin to", host, port)
    @conn = nrepl.connect({port: port, host: host, verbose: false})
    responseLoggingStarted = false

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
          unless responseLoggingStarted
            @startResponseLogging(messageHandler)
            responseLoggingStarted = true

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
        # TODO test this
        atom.notifications.addWarning "WARNING: This version of Clojure is not supported by Proto REPL. You may experience issues.",
          dismissable: true
      callback()

  startResponseLogging: (messageHandler)->
    # Log any output from the nRepl connection messages
    @conn.messageStream.on "messageSequence", (id, messages)=>
      for msg in messages
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

  # Sends the given code to the REPL and calls the given callback with the results
  sendCommand: (code, displayInRepl, resultHandler)->
    return null unless @connected()
    if displayInRepl
      session = @session
    else
      session = @cmdSession

    # Wrap code in read eval to handle invalid code and reader conditionals
    code = @wrapCodeInReadEval(code)

    @conn.eval code, @currentNs, session, (err, messages)=>
      for msg in messages
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
