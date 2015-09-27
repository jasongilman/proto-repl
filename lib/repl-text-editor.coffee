{Task} = require 'atom'
path = require 'path'
# Pty = require.resolve './process'
Pty = require.resolve './process2'

module.exports = 
class ReplTextEditor
  # This is set to some string to strip out of the text displayed. It is used to remove code that
  # is sent to the repl because the repl will print the code that was sent to it.
  textToIgnore: null

  constructor: ->
    projectPath = atom.project.getPaths()[0]

    atom.workspace.open("Clojure REPL", split:'right').done (textEditor) =>
      @textEditor = textEditor
      @textEditor.insertText("Loading REPL...\n")

    # TODO make env configurable
    @ptyProcess = Task.once Pty, 
                            path.resolve(projectPath), 
                            "/Users/jason/work/bin/lein", 
                            ["trampoline", "run", "-m", "clojure.main"]
    @attachListeners()

  strToBytes: (s)->
    s.charCodeAt(n) for n in [0..s.length]

  attachListeners: ->
    @ptyProcess.on 'proto-repl-process:data', (data) =>
      @textEditor.getBuffer().append(data)

  sendToRepl: (text)->
    @ptyProcess.send event: 'input', text: text + "\n"



