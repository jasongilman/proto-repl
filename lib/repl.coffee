{Task, Emitter} = require 'atom'

ReplTextEditor = require './repl-text-editor'
ReplHistory = require './repl-history'
nrepl = require('nrepl-client')
ClojureVersion = require './clojure-version'
LocalReplProcess = require './local-repl-process'
RemoteReplProcess = require './remote-repl-process'

replHelpText = ";; This Clojure REPL is divided into two areas, top and bottom, delimited by a line of dashes. The top area shows code that's been executed in the REPL, standard out from running code, and the results of executed expressions. The bottom area allows Clojure code to be entered. The code can be executed by pressing shift+enter.\n\n;; Try it now by typing (+ 1 1) in the bottom section and pressing shift+enter.\n\n;; Working in another Clojure file and sending forms to the REPL is the most efficient way to work. Use the following key bindings to send code to the REPL. See the settings for more keybindings.\n\n;; ctrl-, then b - execute block. Finds the block of Clojure code your cursor is in and executes that.\n\n;; Try it now. Put your cursor inside this block and press ctrl and comma together,\n;; release, then press b.\n(+ 2 3)\n\n;; ctrl-, s - Executes the selection. Sends the selected text to the REPL.\n\n;; Try it now. Select these three lines and press ctrl and comma together, \n;; release, then press s.\n(println \"hello 1\")\n(println \"hello 2\")\n(println \"hello 3\")\n\n;; You can disable this help text in the settings.\n"


module.exports =

# Represents the REPL where code is executed and displayed. It is split into three
# parts. 1. The running process. 2. The nRepl connection, 3. The text editor where
# results are displayed.
class Repl
  emitter: null

  # A local or remote process
  process: null

  # The nrepl connection
  conn: null

  # The text editor where results are displayed or commands can be enterered
  replTextEditor: null

  # A map of code execution extension names to callback functions.
  codeExecutionExtensions: null

  constructor: (@codeExecutionExtensions)->
    @emitter = new Emitter
    @replTextEditor = new ReplTextEditor()
    @replHistory = new ReplHistory()

    # Connect together repl text editor and history
    @replTextEditor.onHistoryBack =>
      if @running()
        @replHistory.setCurrentText(@replTextEditor.enteredText())
        @replTextEditor.setEnteredText(@replHistory.back())

    @replTextEditor.onHistoryForward =>
      if @running()
        @replHistory.setCurrentText(@replTextEditor.enteredText())
        @replTextEditor.setEnteredText(@replHistory.forward())

    @replTextEditor.onDidOpen =>
      # Display the help text when the repl opens.
      if atom.config.get("proto-repl.displayHelpText")
        @appendText(replHelpText)

    # The window was closed
    @replTextEditor.onDidClose =>
      try
        @process?.stop(@session)
        @replTextEditor = null
        @emitter.emit 'proto-repl-repl:close'
      catch error
        console.log("Warning error while closing: " + error)

  # Calls the callback after the REPL has been started
  onDidStart: (callback)->
    @emitter.on 'proto-repl-repl:start', callback

  # Returns true if the process is running
  running: ->
    @process?.running() && @conn != null

  # Starts the process unless it's already running.
  startProcessIfNotRunning: (projectPath=null)->
    if @running()
      @appendText("REPL already running")
    else
      @process = new LocalReplProcess(
        (text, waitUntilOpen=false)=>@appendText(text, waitUntilOpen),
        (details)=>@connectToRepl(details))
      @process.start(projectPath)


  # Starts nRepl connection
  # * `options` An {Object} with following keys
  #   * `host` The {String} host name to connect (optional). Defaults to "localhost"
  #   * `port` The {Number} port number to connect
  startRemoteReplConnection: ({host, port})->
    if @running()
      @appendText("REPL already running")
      return

    @process = new RemoteReplProcess(
      (text, waitUntilOpen=false)=>@appendText(text, waitUntilOpen),
      (details)=>@connectToRepl(details)
    )
    @process.start(host, port)


  connectToRepl: ({host, port})=>
    host ?= "localhost"
    @conn = nrepl.connect({port: port, host: host, verbose: false})
    @conn.once 'connect', =>
      # Create a persistent session
      @conn.clone (err, messages)=>
        @session = messages[0]["new-session"]

        # Determine the Clojure Version
        @conn.eval "*clojure-version*", "user", @session, (err, messages)=>
          value = (msg.value for msg in messages)[0]
          @clojureVersion = new ClojureVersion(protoRepl.parseEdn(value))
          unless @clojureVersion.isSupportedVersion()
            @appendText("WARNING: This version of Clojure is not supported by Proto REPL. You may experience issues.")

        @emitter.emit 'proto-repl-repl:start'

      # Log any output from the nRepl connection messages
      @conn.messageStream.on "messageSequence", (id, messages)=>
        for msg in messages
          if msg.out
            @appendText(msg.out)

  # Invoked when the REPL window is closed.
  onDidClose: (callback)->
    @emitter.on 'proto-repl-repl:close', callback

  # Appends text to the display area of the text editor.
  appendText: (text, waitUntilOpen=false)->
    @replTextEditor?.appendText(text, waitUntilOpen)

  # Sends the given code to the REPL and calls the given callback with the results
  sendToRepl: (text, resultHandler)->
    return null unless @running()
    @conn.eval text, "user", @session, (err, messages)=>
      for msg in messages
        if msg.value
          resultHandler(value: msg.value)
        else if msg.err
          resultHandler(error: msg.err)

  # Makes an inline displaying result handler
  # * editor - the text editor to show the inline display in
  # * range - the range of code to display the inline result next to
  # * valueToTreeFn - a function that can convert the result value into the tree
  # of content for inline display.
  makeInlineHandler: (editor, range, valueToTreeFn)->
    (result) =>
      if result.value
        tree = valueToTreeFn(result.value)
      else
        tree = [result.error]

      start = range.start.row
      end = range.end.row

      # Remove the existing view if there is one
      @ink.Result.removeLines(editor, start, end)

      # Defines a recursive function that can convert the tree of values to
      # display into an Atom Ink tree view. Sub-branches are expandable.
      recurseTree = ([head, children...])=>
        if children && children.length > 0
          childViews = children.map  (x)=>
            if x instanceof Array
              recurseTree(x)
            else
              view = document.createElement 'div'
              view.appendChild(new Text(x))
              view
          @ink.tree.treeView(head, childViews, {})
        else
          view = document.createElement 'div'
          view.appendChild(new Text(head))
          view
      view = recurseTree(tree)

      # Add new inline view
      new @ink.Result editor, [start, end],
        content: view

  # Wraps the given code in an eval and a read-string. This safely handles
  # unbalanced parentheses, other kinds of invalid code, and handling reader
  # conditionals. http://clojure.org/guides/reader_conditionals
  wrapCodeInReadEval: (code)->
    escaped = code.replace(/\\/g,"\\\\").replace(/"/g, "\\\"")
    if @clojureVersion?.isReaderConditionalSupported()
      "(eval (read-string {:read-cond :allow} \"#{escaped}\"))"
    else
      "(eval (read-string \"#{escaped}\"))"

  inlineResultHandler: (result, options)->
    # Alpha support of inline results using Atom Ink.
    if @ink && options.inlineOptions && atom.config.get('proto-repl.showInlineResults')
      io = options.inlineOptions
      handler = @makeInlineHandler io.editor, io.range, (value)->
        protoRepl.ednToDisplayTree(value)

      handler(result)

  appendingResultHandler: (result, options)->
    if result.error
      @appendText("=> " + result.error)
    else if atom.config.get("proto-repl.autoPrettyPrint")
        @appendText("=>\n" + protoRepl.prettyEdn(result.value))
    else
      @appendText("=> " + result.value)

  normalResultHandler: (result, options)->
    @appendingResultHandler(result, options)
    @inlineResultHandler(result, options)

  # Executes the given code string.
  # Valid options:
  # * resultHandler - a callback function to invoke with the value that was read.
  #   If this is passed in then the value will not be displayed in the REPL.
  # * displayCode - Code to display in the REPL. This can be used when the code
  # executed is wrapped in eval or other code that shouldn't be displayed to the
  # user.
  executeCode: (code, options={})->
    return null unless @running()

    # Wrap code in read eval to handle invalid code and reader conditionals
    code = @wrapCodeInReadEval(code)

    # If a handler is supplied use that otherwise use the default.
    resultHandler = options?.resultHandler
    handler = (result)=>
      if resultHandler
        resultHandler(result, options)
      else
        @normalResultHandler(result, options)

    if options.displayCode && atom.config.get('proto-repl.displayExecutedCodeInRepl')
      @appendText(options.displayCode)

    @sendToRepl code, (result)=>
      # check if it's an extension response
      if result.value && result.value.match(/\[\s*:proto-repl-code-execution-extension/)
        parsed = window.protoRepl.parseEdn(result.value)
        extensionName = parsed[1]
        data = parsed[2]
        extensionCallback = @codeExecutionExtensions[extensionName]
        if extensionCallback
          extensionCallback(data)
      handler(result)

  # Executes the text that was entered in the entry area
  executeEnteredText: ->
    return null unless @running()
    if editor = atom.workspace.getActiveTextEditor()
      if editor == @replTextEditor.textEditor
        code = @replTextEditor.enteredText()
        @replTextEditor.clearEnteredText()
        @replHistory.setLastTextAndAddNewEntry(code)
        # Wrap code in do block so that multiple statements entered at the REPL
        # will execute all of them
        @executeCode("(do #{code})", displayCode: code)

  exit: ->
    return null unless @running()
    @appendText("Stopping REPL")
    @process.stop(@session)
    @process = null
    @conn = null

  interrupt: ->
    return null unless @running()
    @conn.interrupt @session, (err, result)=>
      @appendText("interrupted")

  clear: ->
    @replTextEditor.clear()
