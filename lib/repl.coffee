{Task, Emitter} = require 'atom'
path = require 'path'
fs = require('fs')
ReplProcess = require.resolve './repl-process'
ReplTextEditor = require './repl-text-editor'
ReplHistory = require './repl-history'
nrepl = require('nrepl-client')

replHelpText = ";; This Clojure REPL is divided into two areas, top and bottom, delimited by a line of dashes. The top area shows code that's been executed in the REPL, standard out from running code, and the results of executed expressions. The bottom area allows Clojure code to be entered. The code can be executed by pressing shift+enter.\n\n;; Try it now by typing (+ 1 1) in the bottom section and pressing shift+enter.\n\n;; Working in another Clojure file and sending forms to the REPL is the most efficient way to work. Use the following key bindings to send code to the REPL. See the settings for more keybindings.\n\n;; ctrl-, then b - execute block. Finds the block of Clojure code your cursor is in and executes that.\n\n;; Try it now. Put your cursor inside this block and press ctrl and comma together,\n;; release, then press b.\n(+ 2 3)\n\n;; ctrl-, s - Executes the selection. Sends the selected text to the REPL.\n\n;; Try it now. Select these three lines and press ctrl and comma together, \n;; release, then press s.\n(println \"hello 1\")\n(println \"hello 2\")\n(println \"hello 3\")\n\n;; You can disable this help text in the settings.\n"

# The path to a default project to use if proto repl is started outside of a leiningen project
defaultProjectPath = "#{atom.packages.getPackageDirPaths()[0]}/proto-repl/proto-no-proj"

# The code to send to the repl to exit.
EXIT_CMD="(System/exit 0)"

module.exports =

# Represents the REPL where code is executed and displayed. It is split into three
# parts. 1. The running process. 2. The nRepl connection, 3. The text editor where
# results are displayed.
class Repl
  emitter: null

  # The running java process
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
        # I couldn't refer to sendToRepl directly here. I'm not sure why.
        # Tell the process to shutdown
        @conn?.eval(EXIT_CMD)
        @conn = null
        # Kill the process to make sure.
        @process?.send event: 'kill'
        @process = null
        @replTextEditor = null
        @emitter.emit 'proto-repl-repl:close'
      catch error
        console.log("Warning error while closing: " + error)

    @startProcess()

  # Returns true if the process is running
  running: ->
    @process != null && @conn != null

  # Starts the process unless it's already running.
  startProcess: ->
    unless @process
      @replTextEditor.onDidOpen =>
        @appendText("Starting REPL...\n")

      # If we're not in a project or there isn't a leiningen project file use
      # the default project
      projectPath = atom.project.getPaths()[0]
      if !(projectPath?) || !fs.existsSync(projectPath + "/project.clj")
        projectPath = defaultProjectPath

      # Start the repl process as a background task
      @process = Task.once ReplProcess,
                           path.resolve(projectPath),
                           atom.config.get('proto-repl.leinPath').replace("/lein",""),
                           atom.config.get('proto-repl.leinArgs').split(" ")

      # The process sends stdout
      @process.on 'proto-repl-process:data', (data) =>
        @appendText(data)

      # The nREPL port was captured from output
      @process.on 'proto-repl-process:nrepl-port', (port) =>
        # Setup the nREPL connection
        @conn = nrepl.connect({port: port, verbose: false})
        @conn.once 'connect', =>
          # Create a persistent session
          @conn.clone (err, messages)=>
            @session = messages[0]["new-session"]
          # Log any output from the nRepl connection messages
          @conn.messageStream.on "messageSequence", (id, messages)=>
            for msg in messages
              if msg.out or msg.err
                @appendText(msg.out or msg.err)

      # The process exited.
      @process.on 'proto-repl-process:exit', ()=>
        @appendText("\nREPL Closed\n")
        # The REPL Text editor may or may not be still open at this point. We track
        # that separately.
        @process = null
        @conn = null

  # Invoked when the REPL window is closed.
  onDidClose: (callback)->
    @emitter.on 'proto-repl-repl:close', callback

  # Appends text to the display area of the text editor.
  appendText: (text)->
    @replTextEditor?.appendText(text)

  sendToRepl: (text, resultHandler)->
    return null unless @running()
    @conn.eval text, "user", @session, (err, messages)=>
      for msg in messages
        if msg.value
          resultHandler(msg.value)

  # Makes an inline displaying result handler
  # * editor - the text editor to show the inline display in
  # * range - the range of code to display the inline result next to
  # * valueToTreeFn - a function that can convert the result value into the tree
  # of content for inline display.
  makeInlineHandler: (editor, range, valueToTreeFn)->
    (value) =>
      tree = valueToTreeFn(value)
      view = @ink.tree.fromJson(tree)[0]
      @ink.results.showForRange editor, range,
        content: view
        plainresult: value

  # Executes the given code string.
  # Valid options:
  # * resultHandler - a callback function to invoke with the value that was read.
  #   If this is passed in then the value will not be displayed in the REPL.
  # * displayCode - Code to display in the REPL. This can be used when the code
  # executed is wrapped in eval or other code that shouldn't be displayed to the
  # user.
  executeCode: (code, options={})->
    return null unless @running()

    resultHandler = options?.resultHandler
    normalHandler = (value)=>
      if resultHandler
        resultHandler(value)
      else
        if atom.config.get("proto-repl.autoPrettyPrint")
          @appendText("=>\n" + protoRepl.prettyEdn(value))
        else
          @appendText("=> " + value)

        # Alpha support of inline results using Atom Ink.
        if @ink && options.inlineOptions && atom.config.get('proto-repl.showInlineResults')
          io = options.inlineOptions
          toplevelValue = value
          if toplevelValue.length > 50
            toplevelValue = toplevelValue.substr(0, 50) + "..."
          prettyPrinted = protoRepl.prettyEdn(value).trim()
          if prettyPrinted == toplevelValue
            tree = [toplevelValue]
          else
            tree = [toplevelValue, [prettyPrinted]]

          view = @ink.tree.fromJson(tree)[0]
          @ink.results.showForRange io.editor, io.range,
            content: view
            plainresult: value

    if options.displayCode && atom.config.get('proto-repl.displayExecutedCodeInRepl')
      @appendText(options.displayCode)

    @sendToRepl code, (value)=>
      # check if it's an extension response
      if value.match(/\[\s*:proto-repl-code-execution-extension/)
        parsed = window.protoRepl.parseEdn(value)
        extensionName = parsed[1]
        data = parsed[2]
        extensionCallback = @codeExecutionExtensions[extensionName]
        if extensionCallback
          extensionCallback(data)
        else
          normalHandler(value)
      else
        normalHandler(value)

  # Executes the text that was entered in the entry area
  executeEnteredText: ->
    return null unless @running()
    if editor = atom.workspace.getActiveTextEditor()
      if editor == @replTextEditor.textEditor
        code = @replTextEditor.enteredText()
        @replTextEditor.clearEnteredText()
        @replHistory.setLastTextAndAddNewEntry(code)
        @executeCode(code, displayCode: code)

  exit: ->
    return null unless @running()
    @appendText("Stopping REPL")
    @sendToRepl(EXIT_CMD)
    @conn = null

  interrupt: ->
    return null unless @running()
    @conn.interrupt @session, (err, result)=>
      @appendText("interrupted")

  clear: ->
    @replTextEditor.clear()
