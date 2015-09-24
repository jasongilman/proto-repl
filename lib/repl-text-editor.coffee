{Task} = require 'atom'
path = require 'path'
Pty = require.resolve './process'

module.exports = 
class ReplTextEditor

  constructor: ->
    projectPath = atom.project.getPaths()[0]

    atom.workspace.open("Clojure REPL", split:'right').done (textEditor) =>
      @textEditor = textEditor

    # TODO make env configurable
    @ptyProcess = Task.once Pty, path.resolve(projectPath), "/Users/jason/work/bin/lein", ["trampoline", "run", "-m", "clojure.main"]
    @attachListeners()

  attachListeners: ->
    @ptyProcess.on 'proto-repl-process:data', (data) =>
      @textEditor.insertText(data)

  sendToRepl: (text)->
    @ptyProcess.send event: 'input', text: text



