#TODO docs
NREPL_SESSION = "ExtensionsSession"


module.exports =

# TODO if proto repl lib isn't included (or an old version) then this will just
# get errors. How do we allow this to gracefully fail if projects don't have it?



class ExtensionsFeature

  # Instance of the repl
  protoRepl: null

  running: false

  # TODO needed?
  subscriptions: null

  # A map of code execution extension names to callback functions.
  # See registerCodeExecutionExtension documentation for information on code execution extensions.
  # The same mutable map is shared with the REPL.
  codeExecutionExtensions: {}

  # Tracks the number of errors received while trying to retrieve results.
  # We bail out if there are too many.
  numErrors: 0

  constructor: (@protoRepl)->
    null


  # TODO update the documentation of code execution extensions

  # Registers a code execution extension with the given name and callback function.
  #
  # Code execution extensions allow other Atom packages to extend Proto REPL
  # by taking output from the REPL and redirecting it for other uses like
  # visualization.
  # Code execution extensions are triggered when the result of code execution is
  # a vector with the first element is :proto-repl-code-execution-extension. The
  # second element in the vector should be the name of the extension to trigger.
  # The name will be used to locate the callback function. The third element in
  # the vector will be passed to the callback function.
  registerCodeExecutionExtension: (name, callback)->
    @codeExecutionExtensions[name] = callback

  # Handles a result from the REPL. Returns true if it was handled by an extension.
  handleReplResult: (value)->
    if value.match(/\[\s*:proto-repl-code-execution-extension/)
      parsed = window.protoRepl.parseEdn(value)
      extensionName = parsed[1]
      data = parsed[2]
      if extensionCallback = @codeExecutionExtensions[extensionName]
        extensionCallback(data)
        true

  # TODO change some of these console.logs to warnings.

  # TODO document this code

  handleResponse: (value)->
    parsed = window.protoRepl.parseEdn(value)
    extensionName = parsed["extension-name"]
    if extensionCallback = @codeExecutionExtensions[extensionName]
      result = extensionCallback(parsed.data)
      if parsed["requires-response"]
        @respondWith(parsed.id, result)
    else
      console.log "No extension registered with name #{extensionName}"

  respondWith: (id, result)->
    code = "(do
              (require '[proto-repl.code-exec-core-async :as c])
              (c/respond-with \"#{id}\" \"#{result}\"))"
    window.protoRepl.executeCode code,
      displayInRepl: false,
      session: NREPL_SESSION,
      resultHandler: (result, options)=>
        console.log("Responds with result #{result}")

  readNextCommand: ->
    return unless @running
    code = "(do
              (require '[proto-repl.code-exec-core-async :as c])
              (c/read-request))"
    console.log "Reading next command"
    window.protoRepl.executeCode code,
      displayInRepl: false,
      session: NREPL_SESSION,
      resultHandler: (result, options)=>
        console.log result
        if result.value == ":proto-repl.code-exec-core-async/timeout"
          console.log("timeout waiting for next command.")
          @readNextCommand()
        else if result.value
          @handleResponse(result.value)
          @readNextCommand()
        else
          @numErrors = @numErrors + 1
          if @numErrors < 10
            # Wait a second after an error before trying again.
            setTimeout(=>
              @readNextCommand()
            , 1000)
          else
            console.log "Repeated errors trying to execute command #{result.error}. Stopping automatic extensions feature"
            @stopExtensionCommandProcessing()

  startExtensionCommandProcessing: ->
    @running = true
    @numErrors = 0
    @readNextCommand()

  stopExtensionCommandProcessing: ->
    @running = false
