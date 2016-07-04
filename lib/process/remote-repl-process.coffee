NReplConnection = require './nrepl-connection'


module.exports=
# Represents a remotely running REPL process.
class RemoteReplProcess

  # A function that can be used to write back messages to the REPL.
  appendText: null

  # The nREPL connection
  conn: new NReplConnection()

  stopCallback: null

  constructor: (@appendText)->
    null

  getType: ->
    "Remote"

  start: (connOptions)->
    @conn.start(connOptions)
    @stopCallback = connOptions.stopCallback

  sendCommand: (code, options, resultHandler)->
    @conn.sendCommand(code, options, resultHandler)

  getCurrentNs: ->
    @conn.getCurrentNs()

  interrupt: ->
    @conn.interrupt()
    @appendText("Interrupting")

  running: ()->
    @conn.connected()

  # Closes the remote connection.
  stop: ()->
    @stopCallback?()
    @conn.close()
