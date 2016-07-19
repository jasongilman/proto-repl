# Identifies the name of the nREPL session to use when making requests for this feature.
NREPL_SESSION = "ExtensionsSession"

module.exports =

# Allows extensions of Proto REPL to connect to code running in the REPL.
class ExtensionsFeature

  # Instance of the repl
  protoRepl: null

  running: false

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

  # Handles a request read from the Clojure side of an extension and sends it to the
  # Atom side.
  handleRequests: (commandEdn)->
    messages = window.protoRepl.parseEdn(commandEdn)
    for message in messages
      extensionName = message["extension-name"]
      if extensionCallback = @codeExecutionExtensions[extensionName]
        try
          result = extensionCallback(message.data)
          if message["requires-response"]
            @respondWith(message.id, result)
        catch error
          console.log "Error handling message #{message}. Error #{error}"
      else
        console.log "No extension registered with name #{extensionName}"

  # Responds to a request from a request with the given id with the response data.
  respondWith: (id, response)->
    code = "(do
             (require '[proto-repl.extension-comm])
             (proto-repl.extension-comm/respond-to
               proto-repl.extension-comm/global-ext-state
               \"#{id}\" \"#{protoRepl.jsToEdn(response)}\"))"
    window.protoRepl.executeCode code,
      displayInRepl: false,
      session: NREPL_SESSION,
      resultHandler: (result, options)=>
        if result.error
          console.log "Error responding: #{result.error}"

  # Reads the next request and processes it. Calls it self when it's done as long
  # as the running flag is true.
  readNextRequest: ->
    return unless @running
    code = "(do
             (require '[proto-repl.extension-comm])
             (proto-repl.extension-comm/read-requests
               proto-repl.extension-comm/global-ext-state 10))"
    window.protoRepl.executeCode code,
      displayInRepl: false,
      session: NREPL_SESSION,
      resultHandler: (result, options)=>
        if result.value == ":proto-repl.extension-comm/timeout"
          @readNextRequest()
        else if result.value
          @handleRequests(result.value)
          @readNextRequest()
        else
          @numErrors = @numErrors + 1
          if @numErrors < 10
            # Wait a second after an error before trying again.
            setTimeout(=>
              @readNextRequest()
            , 1000)
          else
            console.log "Repeated errors trying to execute request #{result.error}. Stopping automatic extensions feature"
            @stopExtensionRequestProcessing()

  # Starts processing requests to send commands from the Clojure side of an
  # extension to the Atom side of an extension.
  startExtensionRequestProcessing: ->
    unless @running
      @running = true
      @numErrors = 0
      @readNextRequest()

  # Stops processing requests.
  stopExtensionRequestProcessing: ->
    @running = false
