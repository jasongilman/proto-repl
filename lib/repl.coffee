{Task, Emitter} = require 'atom'

Spinner = require './load-widget'
ReplTextEditor = require './views/repl-text-editor'
InkConsole = require './views/ink-console'
LocalReplProcess = require './process/local-repl-process'
RemoteReplProcess = require './process/remote-repl-process'
SelfHostedProcess = require './process/self-hosted-process'
replHelpText = "REPL Instructions\n\nCode can be entered at the bottom and executed by pressing shift+enter.\n\nTry it now by typing (+ 1 1) in the bottom section and pressing shift+enter.\n\nWorking in another Clojure file and sending forms to the REPL is the most efficient way to work. Use the following key bindings to send code to the REPL. See the settings for more keybindings.\n\nctrl-alt-, then b\nExecute block. Finds the block of Clojure code your cursor is in and executes that.\n\nctrl-alt-, s\nExecutes the selection. Sends the selected text to the REPL.\n\nYou can disable this help text in the settings.\n"

# temporary usage of copy of Atom Ink Tree view
TreeView = require './tree-view'

# Temporary performance helpers

startTime = ->
  window.performance.now()

logElapsed = (name, start)->
  elapsed = window.performance.now()-start
  console.log(name + " " + elapsed.toFixed() + " ms")


module.exports =

# Represents the REPL where code is executed and displayed. It is split into three
# parts. 1. The running process. 2. The nRepl connection, 3. The text editor where
# results are displayed.
class Repl
  emitter: null

  # A local or remote process
  process: null

  # The text editor where results are displayed or commands can be enterered
  replTextEditor: null

  ink: null

  extensionsFeature: null

  constructor: (@extensionsFeature)->
    @emitter = new Emitter
    @loadingIndicator = new Spinner()

  consumeInk: (ink)->
    @ink = ink

    if @ink && atom.config.get("proto-repl.inkConsole")
      @replView = new InkConsole(@ink)
    else
      @replView = new ReplTextEditor()

    @replView.onDidOpen =>
      # Display the help text when the repl opens.
      if atom.config.get("proto-repl.displayHelpText")
        @info(replHelpText)
      # Warn if Atom Ink is not installed.
      if !@ink && atom.config.get("proto-repl.inkConsole")
        @info("Atom Ink does not appear to be installed. Install it to get a better REPL experience.")


    # The window was closed
    @replView.onDidClose =>
      try
        @process?.stop(@session)
        @replView = null
        @emitter.emit 'proto-repl-repl:close'
      catch error
        console.log("Warning error while closing: " + error)

  # Calls the callback after the REPL has been started
  onDidStart: (callback)->
    @emitter.on 'proto-repl-repl:start', callback

  onDidStop: (callback)->
    @emitter.on 'proto-repl-repl:stop', callback

  # Returns true if the process is running
  running: ->
    @process?.running()

  # Returns the type of the REPL that's currently running.
  # "SelfHosted", "Remote", Local"
  getType: ->
    @process?.getType()

  isSelfHosted: ->
    @getType() == "SelfHosted"

  handleReplStarted: ->
    @emitter.emit 'proto-repl-repl:start'

  handleReplStopped: ->
    @emitter.emit 'proto-repl-repl:stop'

  # Starts the process unless it's already running.
  startProcessIfNotRunning: (projectPath)->
    if @running()
      @stderr("REPL already running")
    else
      @process = new LocalReplProcess(@replView)
      @process.start projectPath,
        messageHandler: (msg)=> @handleConnectionMessage(msg)
        startCallback: => @handleReplStarted()
        stopCallback: => @handleReplStopped()

  # Starts nRepl connection
  # * `options` An {Object} with following keys
  #   * `host` The {String} host name to connect (optional). Defaults to "localhost"
  #   * `port` The {Number} port number to connect
  startRemoteReplConnection: ({host, port})->
    if @running()
      @stderr("REPL already running")
    else
      @process = new RemoteReplProcess(@replView)
      @info("Starting remote REPL connection on #{host}:#{port}")
      connOptions =
        host: host,
        port: port,
        messageHandler: ((msg)=> @handleConnectionMessage(msg)),
        startCallback: => @handleReplStarted()
        stopCallback: => @handleReplStopped()
      @process.start(connOptions)

  startSelfHostedConnection: ->
    if @running()
      @stderr("REPL already running")
    else
      @process = new SelfHostedProcess(@replView)
      connOptions=
        messageHandler: ((msg)=> @handleConnectionMessage(msg)),
        startCallback: =>
          @info("Self Hosted REPL Started!")
          @handleReplStarted()
        stopCallback: => @handleReplStopped()
      @process.start connOptions

  handleConnectionMessage: (msg)->
    if msg.out
      @stdout(msg.out)
    else
      # Only print values from the regular session.
      if msg.err
        @stderr(msg.err)
      else if msg.value
        @info(@process.getCurrentNs() + "=>")
        if atom.config.get("proto-repl.autoPrettyPrint")
          @replView.result(protoRepl.prettyEdn(msg.value))
        else
          @replView.result(msg.value)

  # Invoked when the REPL window is closed.
  onDidClose: (callback)->
    @emitter.on 'proto-repl-repl:close', callback

  # Displays some result data inline. tree is a recursive structure expected to
  # be of the shape like the following.
  # ["text for display", {button options}, [childtree1, childtree2, ...]]
  displayInline: (editor, range, tree, error=false)->
    end = range.end.row

    # Remove the existing view if there is one
    @ink.Result.removeLines(editor, end, end)

    # Defines a recursive function that can convert the tree of values to
    # display into an Atom Ink tree view. Sub-branches are expandable.
    recurseTree = ([head, button_options, children...])=>
      if children && children.length > 0
        childViews = children.map  (x)=>
          if x instanceof Array
            recurseTree(x)
          else
            # The button options here are for the head not the child
            TreeView.leafView(x,{})
        TreeView.treeView(head, childViews, button_options)
      else
        TreeView.leafView(head, button_options || {})
    view = recurseTree(tree)

    # Add new inline view
    r = new @ink.Result editor, [end, end],
          content: view, error: error, type: if error then 'block' else 'inline'

    # Adding the class here lets us apply proto repl specific styles to the display.
    r.view.classList.add 'proto-repl'


  # Makes an inline displaying result handler
  # * editor - the text editor to show the inline display in
  # * range - the range of code to display the inline result next to
  # * valueToTreeFn - a function that can convert the result value into the tree
  # of content for inline display.
  makeInlineHandler: (editor, range, valueToTreeFn)->
    (result) =>
      isError = false
      if result.value
        tree = valueToTreeFn(result.value)
      else
        tree = [result.error]
        isError = true
      @displayInline(editor, range, tree, isError)

  inlineResultHandler: (result, options)->
    # Alpha support of inline results using Atom Ink.
    if @ink && options.inlineOptions && atom.config.get('proto-repl.showInlineResults')
      io = options.inlineOptions
      handler = @makeInlineHandler io.editor, io.range, (value)->
        protoRepl.ednToDisplayTree(value)

      handler(result)

  normalResultHandler: (result, options)->
    @inlineResultHandler(result, options)

  # Executes the given code string.
  # Valid options:
  # * resultHandler - a callback function to invoke with the value that was read.
  #   If this is passed in then the value will not be displayed in the REPL.
  # * displayCode - Code to display in the REPL. This can be used when the code
  # executed is wrapped in eval or other code that shouldn't be displayed to the
  # user.
  # * displayInRepl - Boolean to indicate if the result value or error should be
  # displayed in the REPL. Defaults to true.
  executeCode: (code, options={})->
    return null unless @running()

    # If a handler is supplied use that otherwise use the default.
    resultHandler = options?.resultHandler
    handler = (result)=>
      if resultHandler
        resultHandler(result, options)
      else
        @normalResultHandler(result, options)

    if options.displayCode && atom.config.get('proto-repl.displayExecutedCodeInRepl')
      @replView.displayExecutedCode(options.displayCode)

    # Display a loading indicator
    if options.inlineOptions?
      editor = options.inlineOptions.editor
      range = options.inlineOptions.range
      # use the id for asynchronous eval/result
      spinid = @loadingIndicator.startAt(editor, range)

    @process.sendCommand code, options, (result)=>
      # Stop the loading indicator
      @loadingIndicator.stop(options?.inlineOptions?.editor, spinid)
      if result.value
        unless @extensionsFeature.handleReplResult(result.value)
          handler(result)
      else
        handler(result)

  # # Executes the text that was entered in the entry area
  executeEnteredText: ->
    return null unless @running()
    @replView.executeEnteredText()

  exit: ->
    return null unless @running()
    @info("Stopping REPL")
    @process.stop()
    @process = null

  interrupt: ->
    @loadingIndicator.clearAll()
    @process.interrupt()

  clear: ->
    @replView.clear()


  # Helpers for adding text to the REPL.
  info: (text)->
    @replView?.info(text)

  stderr: (text)->
    @replView?.stderr(text)

  stdout: (text)->
    @replView?.stdout(text)
