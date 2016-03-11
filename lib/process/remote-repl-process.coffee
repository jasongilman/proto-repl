NReplConnection = require './nrepl-connection'


module.exports=
# Represents a remotely running REPL process.
class RemoteReplProcess

  # A function that can be used to write back messages to the REPL.
  appendText: null

  # The nREPL connection
  conn: new NReplConnection()

  constructor: (@appendText)->
    null

  start: (connOptions)->
    @conn.start(connOptions)
    # TODO how do we append repl closed when we close the connection?
    # Originally was doing something different.

  # TODO displayInRepl doesn't really make sense as an argument.
  # Need to think through what this is really doing and what really makes sense
  # As an argument to the connection.
  sendCommand: (code, displayInRepl, resultHandler)->
    @conn.sendCommand(code, displayInRepl, resultHandler)

  interrupt: ->
    @conn.interrupt()

  running: ()->
    @conn.connected()

  # Closes the remote connection.
  stop: (session)->
    @conn.close()
