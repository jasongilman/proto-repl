self_hosted_clj = require '../edn_reader/edn_reader/self_hosted.js'
{allowUnsafeEval, allowUnsafeNewFunction} = require 'loophole'

module.exports=

# This is fake process that allows a self hosted ClojureScript REPL. The Related
# code is in edn-reader.self-hosted.
class SelfHostedProcess

  # A function that can be used to write back messages to the REPL.
  appendText: null

  constructor: (@appendText)->
    null

  getType: ->
    "SelfHosted"

  start: ({messageHandler, startCallback})->
    return if @running()
    @messageHandler = messageHandler
    @startRedirectingConsoleOutput()
    startCallback()

  # TODO displayInRepl doesn't really make sense as an argument.
  # Need to think through what this is really doing and what really makes sense
  # As an argument to the connection.
  sendCommand: (code, displayInRepl, resultHandler)->
    # TODO beef up error responses. It currently returns
    # TypeError: Cannot read property 'call' of undefined at eval
    # if somewhere within the code you refer to a function that's not defined.

    # TODO another problem is with defining functions that refer to vars that don't exists
    # There's no error until runtime. But with another user or replumb reepl they get compilation errors.

    allowUnsafeEval =>
      allowUnsafeNewFunction =>
        console.debug("Evaling", code)
        self_hosted_clj.eval_str code, (result)=>
          console.debug("Result:", result)
          if result["success?"]
            @messageHandler value: result.value
            resultHandler value: result.value
          else
            error = result.error.cause?.toString() ||
              result.error.toString()
            resultHandler error: error
            @messageHandler err: error

  interrupt: ->
    # doesn't do anything
    return null

  running: ()->
    @messageHandler?

  # Closes the remote connection.
  stop: (session)->
    return unless @running()
    @stopRedirectingConsoleOutput()
    @appendText("Self hosted REPL stopped")

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

      protoLog = @appendText

      console.log = ->
        args = Array.prototype.slice.call(arguments)
        protoLog(args.join(" "))
        originalLog.apply console, arguments
      console.warn = ->
        args = Array.prototype.slice.call(arguments)
        protoLog(args.join(" "))
        originalWarn.apply console, arguments
      console.error = ->
        args = Array.prototype.slice.call(arguments)
        protoLog(args.join(" "))
        originalError.apply console, arguments

  # Stops redirecting console.log and friends to the Proto REPL repl.
  stopRedirectingConsoleOutput: ->
    return unless @originalLog
    console.log = @originalLog
    console.warn = @originalWarn
    console.error = @originalError
