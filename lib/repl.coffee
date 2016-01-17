{Task, Emitter, Point} = require 'atom'
path = require 'path'
fs = require('fs')
ReplProcess = require.resolve './repl-process'
nrepl = require('nrepl-client')

replHelpText = ";; This is a text editor and also a Clojure REPL.  It behaves
differently than a typical Clojure REPL. You can type anywhere and modify any of
the displayed text. Commands are not sent by typing in the REPL and pressing
enter. They are sent through keyboard shortcuts.\n
\n
;; REPL Execution Keybindings\n
;; Note: These keybindings can be executed from any file and the results will be
displayed in this REPL.\n
;; The keybindings are almost all of the form ctrl + comma, release, and then another key.\n
;; See the settings for more keybindings.\n
\n
;; ctrl-, then b - execute block. Finds the block of Clojure code your cursor is in
and executes that.\n
\n
;; Try it now. Put your cursor inside this block and press ctrl and comma together, \n
;; release, then press b.\n
(+ 2 3)\n
\n
;; ctrl-, s - Executes the selection. Sends the selected text to the REPL.\n
\n
;; Try it now. Select these three lines and press ctrl and comma together, \n
;; release, then press s.\n
(println \"hello 1\")\n
(println \"hello 2\")\n
(println \"hello 3\")\n
\n
;; You can disable this help text in the settings.\n"

# The path to a default project to use if proto repl is started outside of a leiningen project
defaultProjectPath = "#{atom.packages.getPackageDirPaths()[0]}/proto-repl/proto-no-proj"

TAB_TITLE = "Clojure REPL"

# The code to send to the repl to exit.
EXIT_CMD="(System/exit 0)"

# TODO handle the resizing of the text editor or consider making it smaller
EDIT_DELIMITER="--------------------\n"

module.exports =
class Repl
  # This is set to some string to strip out of the text displayed. It is used to remove code that
  # is sent to the repl because the repl will print the code that was sent to it.
  textToIgnore: null
  emitter: null

  # TODO comment these
  allowAnyChange: false
  delimiterRow: 0

  constructor: ->
    @emitter = new Emitter
    projectPath = atom.project.getPaths()[0]

    # If we're not in a project or there isn't a leiningen project file use
    # the default project
    if !(projectPath?) || !fs.existsSync(projectPath + "/project.clj")
      projectPath = defaultProjectPath

    # Opens the text editor that will represent the REPL.
    atom.workspace.open(TAB_TITLE, split:'right').done (textEditor) =>
      @configureNewTextEditor(textEditor)

    # Start the repl process as a background task
    @process = Task.once ReplProcess,
                         path.resolve(projectPath),
                         atom.config.get('proto-repl.leinPath').replace("/lein",""),
                         atom.config.get('proto-repl.leinArgs').split(" ")

    @attachListeners()

  # TODO comment
  configureNewTextEditor: (textEditor)->
    @textEditor = textEditor

    # Force the tab to have a title
    @textEditor.getTitle = -> TAB_TITLE
    @textEditor.emitter.emit 'did-change-title', TAB_TITLE

    # Change the text editor so it will never require saving.
    @textEditor.isModified = -> false

    # Set the delimiter row index so we can keep track of where the user can type.
    @delimiterRow = 0
    @textEditor.getBuffer().append(EDIT_DELIMITER)

    # TODO do we have to have this function here?
    shouldAllowChange = (change)=> @allowsChange(change)

    # The text editor does not allow direct manipulation except below the delimiter
    # Replace buffer applyChange with our own that decides when the change
    # can be applied
    @textEditor.buffer.oldApplyChange = @textEditor.buffer.applyChange
    @textEditor.buffer.applyChange = (change, skipUndo) ->
      if shouldAllowChange(change)
        @oldApplyChange(change, skipUndo)


    # TODO if they press enter at the bottom of the text editor we want to
    # 1. send the code to the repl
    # 2. clear the delimited area
    @textEditor.oldInsertText = @textEditor.insertText
    @textEditor.insertText = (text, options={}) ->
      console.log("Inserting text", text)
      @oldInsertText(text, options)

    # TODO if they press up or down cycle through history
    @textEditor.oldMoveUp = @textEditor.moveUp
    @textEditor.moveUp = (lineCount)->
      console.log("Moving up")
      @oldMoveUp(lineCount)

    # Configure text editor for clojure syntax highlighting
    if atom.config.get('proto-repl.useClojureSyntax')
      grammar = atom.grammars.grammarForScopeName('source.clojure')
      @textEditor.setGrammar(grammar)

    # Handle the text editor being closed
    @textEditor.onDidDestroy =>
      try
        # I couldn't refer to sendToRepl directly here. I'm not sure why.
        @conn?.eval(EXIT_CMD)
        @conn = null
        @process.send event: 'kill'
        @textEditor = null
      catch error
        console.log("Warning error while closing: " + error)

    # Set the text editor not to be wrapped.
    @textEditor.setSoftWrapped(true)

    # Display the help text when the repl opens.
    if atom.config.get("proto-repl.displayHelpText")
      @appendText(replHelpText)

    @appendText(";; Loading REPL...\n")

  autoscroll: ->
    if atom.config.get('proto-repl.autoScroll')
      @textEditor?.scrollToBottom()

  # TODO comment
  allowsRangeChange: (range)->
    range.start.row > @delimiterRow && range.end.row > @delimiterRow

  # TODO comment
  allowsChange: (change)->
    @allowAnyChange || (@allowsRangeChange(change.newRange) && @allowsRangeChange(change.oldRange))

  # TODO comment
  appendText: (text)->
    if @textEditor && text.length > 0

      # Append newline to text if it doesn't end with one.
      if text[text.length-1] != "\n"
        text = text + "\n"

      insertionPoint = new Point(@delimiterRow)

      @allowAnyChange = true
      insertRange = @textEditor.getBuffer().insert(insertionPoint, text)
      @allowAnyChange = false

      @delimiterRow = insertRange.end.row

      @autoscroll()

  attachListeners: ->
    @process.on 'proto-repl-process:data', (data) =>
      @appendText(data)

    # Called when the nREPL port is captured from the REPL output.
    # Setup the nREPL connection
    @process.on 'proto-repl-process:nrepl-port', (port) =>
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

    @process.on 'proto-repl-process:exit', ()=>
      @textEditor = null
      @emitter.emit 'proto-repl-text-editor:exit'
      @appendText("\nREPL Closed\n")

  onDidExit: (callback)->
    @emitter.on 'proto-repl-text-editor:exit', callback

  sendToRepl: (text, resultHandler)->
    @conn?.eval text, "user", @session, (err, messages)=>
      for msg in messages
        if msg.value
          resultHandler(msg.value)

  exit: ->
    @sendToRepl(EXIT_CMD)
    @conn = null
    @appendText("\nREPL Closed\n")

  interrupt: ->
    @conn?.interrupt @session, (err, result)=>
      @appendText("interrupted")

  clear: ->
    @textEditor?.setText("")
