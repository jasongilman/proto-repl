# TODO the name edn reader is temporary for now. It really means the clojurescript
# portion of proto repl
self_hosted_clj = require '../edn_reader/edn_reader/self_hosted.js'
{allowUnsafeEval, allowUnsafeNewFunction} = require 'loophole'

module.exports=
# TODO
class SelfHostedProcess

  # A function that can be used to write back messages to the REPL.
  appendText: null

  constructor: (@appendText)->
    null

  getType: ->
    "SelfHosted"

  start: ({messageHandler, startCallback})->
    # :) We're always started
    @messageHandler = messageHandler
    startCallback()

  # TODO displayInRepl doesn't really make sense as an argument.
  # Need to think through what this is really doing and what really makes sense
  # As an argument to the connection.
  sendCommand: (code, displayInRepl, resultHandler)->

    #TODO use this approach to capture console log output and pass as msg.out
    # http://stackoverflow.com/questions/9277780/can-i-extend-the-console-object-for-rerouting-the-logging-in-javascript

    allowUnsafeEval =>
      allowUnsafeNewFunction =>
        self_hosted_clj.eval_str code, (result)=>
          if result["success?"]
            @messageHandler value: result.value
            resultHandler value: result.value
          else
            error = result.error.cause?.toString() ||
              result.error.toString()
            resultHandler error: error
            @messageHandler err: error

    # message handler should be passed nrepl like maps
    #  msg.out or
    #  msg.err or
    # msg.ns and msg.value
    # resultHandler should be passed a map with value or error

  interrupt: ->
    # doesn't do anything
    return null

  running: ()->
    # always running
    true

  # Closes the remote connection.
  stop: (session)->
    # doesn't do anything
    return null
