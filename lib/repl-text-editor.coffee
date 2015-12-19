{Task, Emitter} = require 'atom'
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


module.exports =
class ReplTextEditor
  # This is set to some string to strip out of the text displayed. It is used to remove code that
  # is sent to the repl because the repl will print the code that was sent to it.
  textToIgnore: null
  emitter: null

  constructor: ->
    @emitter = new Emitter
    projectPath = atom.project.getPaths()[0]

    # If we're not in a project or there isn't a leiningen project file use
    # the default project
    if !(projectPath?) || !fs.existsSync(projectPath + "/project.clj")
      projectPath = defaultProjectPath

    # Handles the text editor being closed.
    closingHandler =  =>
      try
        # I couldn't refer to sendToRepl directly here. I'm not sure why.
        @conn?.eval(EXIT_CMD)
        @conn = null
        @process.send event: 'kill'
        @textEditor = null
      catch error
        console.log("Warning error while closing: " + error)

    # Opens the text editor that will represent the REPL.
    atom.workspace.open(TAB_TITLE, split:'right').done (textEditor) =>
      @textEditor = textEditor

      # Force the tab to have a title
      @textEditor.getTitle = -> TAB_TITLE
      @textEditor.emitter.emit 'did-change-title', TAB_TITLE

      # Change the text editor so it will never require saving.
      @textEditor.isModified = -> false

      # Configure text editor for clojure syntax highlighting
      if atom.config.get('proto-repl.useClojureSyntax')
        grammar = atom.grammars.grammarForScopeName('source.clojure')
        @textEditor.setGrammar(grammar)

      # Handle the text editor being closed
      @textEditor.onDidDestroy(closingHandler)

      # Set the text editor not to be wrapped.
      # TODO make this a config option with keyboard short cut and tool bar button
      @textEditor.setSoftWrapped(true)

      # Display the help text when the repl opens.
      if atom.config.get("proto-repl.displayHelpText")
        @appendText(replHelpText)

      @appendText(";; Loading REPL...\n")

    # Start the repl process as a background task
    @process = Task.once ReplProcess,
                         path.resolve(projectPath),
                         atom.config.get('proto-repl.leinPath').replace("/lein",""),
                         atom.config.get('proto-repl.leinArgs').split(" ")

    @attachListeners()


  autoscroll: ->
    if atom.config.get('proto-repl.autoScroll')
      @textEditor?.scrollToBottom()

  appendText: (text)->
    @textEditor?.getBuffer().append(text)
    @autoscroll()

  # Appends the namespace prompt
  appendPrompt: ()->
    @appendText("\n#{@currentNs}=> ")

  attachListeners: ->
    @process.on 'proto-repl-process:data', (data) =>
      @appendText(data)

    # Called when the nREPL port is captured from the REPL output.
    # Setup the nREPL connection
    @process.on 'proto-repl-process:nrepl-port', (port) =>
      @conn = nrepl.connect({port: port, verbose: false})
      @conn.once 'connect', =>

        # Set the current namespace to user. Currently there is no way to change this.
        @currentNs = "user"
        @appendPrompt()

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

  sendToRepl: (text, options=null)->
    resultHandler = options?.resultHandler
    @conn?.eval text, @currentNs, @session, (err, messages)=>
      for msg in messages
        if msg.value
          if resultHandler
            resultHandler(msg.value)
          else
            @appendText(msg.value)
      @appendPrompt()

  exit: ->
    @sendToRepl(EXIT_CMD)
    @conn = null
    @appendText("\nREPL Closed\n")

  interrupt: ->
    @conn?.interrupt @session, (err, result)=>
      @appendText("interrupted")
      @appendPrompt()

  clear: ->
    @textEditor?.setText("")
