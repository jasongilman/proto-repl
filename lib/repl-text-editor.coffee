{Task, Point} = require 'atom'
path = require 'path'
ReplProcess = require.resolve './repl-process'


replHelpText = ";; This is a text editor and also a Clojure REPL.  It behaves
differently than a typical Clojure REPL. You can type anywhere and modify any of
the displayed text. Commands are not sent by typing in the REPL and pressing
enter. They are sent through keyboard shortcuts.\n
\n
;; REPL Execution Keybindings\n
;; Note: These keybindings can be executed from any file and the results will be
displayed in this REPL.\n
;; See the settings for more keybindings.\n
\n
;; cmd+alt+b - execute block. Finds the block of Clojure code your cursor is in
and executes that.\n
\n
;; Try it now. Put your cursor inside this block and press cmd+alt+b\n
(+ 2 3)\n
\n
;; cmd+alt+s - Executes the selection. Sends the selected text to the REPL.\n
\n
;; Try it now. Select these three lines and hit cmd + alt + s.\n
(println \"hello 1\")\n
(println \"hello 2\")\n
(println \"hello 3\")\n
\n
;; You can disable this help text in the settings.\n"

module.exports =
class ReplTextEditor
  # This is set to some string to strip out of the text displayed. It is used to remove code that
  # is sent to the repl because the repl will print the code that was sent to it.
  textToIgnore: null

  # TODO doc (row num)
  # TODO rename this
  activeAppend: null


  constructor: ->
    projectPath = atom.project.getPaths()[0]

    closingHandler =  =>
      try
        @process.send event: 'input', text: "(System/exit 0)\n"
      catch error
        console.log("Warning error while closing: " + error)

    atom.workspace.open("Clojure REPL", split:'right').done (textEditor) =>
      @textEditor = textEditor
      grammar = atom.grammars.grammarForScopeName('source.clojure')
      @textEditor.setGrammar(grammar)
      @textEditor.onDidDestroy(closingHandler)
      @textEditor.setSoftWrapped(true)

      if atom.config.get("proto-repl.displayHelpText")
        @textEditor.insertText(replHelpText)

      @textEditor.insertText(";; Loading REPL...\n")

    @process = Task.once ReplProcess,
                         path.resolve(projectPath),
                         atom.config.get('proto-repl.leinPath'),
                         atom.config.get('proto-repl.leinArgs').split(" ")
    @attachListeners()

  strToBytes: (s)->
    s.charCodeAt(n) for n in [0..s.length]

  autoscroll: ->
    if atom.config.get('proto-repl.autoScroll')
      @textEditor.scrollToBottom()

  attachListeners: ->
    @process.on 'proto-repl-process:data', (data) =>

      # TODO We could have different kinds of special code processors that match
      # on particular prefixes and then end on something else
      # The code execution would be in the same place as well. 

      # TODO code comments
      if matches = data.match(/ProtoReplInsertCodeIntoActiveTextEditor:start:(\d+)\s*/)
        @activeAppend = Number.parseInt(matches[1])
      else if data.startsWith("ProtoReplInsertCodeIntoActiveTextEditor:end")
        @activeAppend = null
      else if @activeAppend
        buffer = atom.workspace.getActiveTextEditor().getBuffer()
        buffer.insert(new Point(@activeAppend+1,0), data)
        @activeAppend = @activeAppend + 1
      else
        @textEditor.getBuffer().append(data)
        @autoscroll()

    @process.on 'proto-repl-process:exit', ()=>
      @textEditor.getBuffer().append("REPL Closed")
      @autoscroll()

  sendToRepl: (text)->
    @process.send event: 'input', text: text + "\n"

  clear: ->
    @textEditor.setText("")
