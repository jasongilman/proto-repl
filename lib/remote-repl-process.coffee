module.exports=
# Represents a remotely running REPL process.
class RemoteReplProcess

  # A function that can be used to write back messages to the REPL.
  appendText: null

  # The nREPL connection
  conn: null

  constructor: (@appendText, @createConn)->
    null

  start: (host, port)->
    if @running()
      return

    @appendText("Starting remote REPL connection on #{host}:#{port}", true)

    @conn = @createConn({host: host, port: port})

    # Handle and show errors
    @conn.on 'error', (err)=>
      atom.notifications.addError "proto-repl: connection error", detail: err, dismissable: true
      setTimeout =>
        @appendText "ERROR: Connection failed"
        , 1000
      @conn = null

    # When repl connection closed
    @conn.on 'finish', =>
      @appendText "\nREPL Closed\n"
      @conn = null

  running: ()->
    @conn != null

  # Closes the remote connection.
  stop: (session)->
    @conn.close session, => return
    @conn = null
