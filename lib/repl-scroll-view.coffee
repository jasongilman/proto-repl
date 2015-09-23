{ScrollView} = require 'atom-space-pen-views'
{Task} = require 'atom'
path = require 'path'
Pty = require.resolve './process'


module.exports = 
class ReplScrollView extends ScrollView
  @content: ->
    @div "Hello World"

  initialize: ->
    projectPath = atom.project.getPaths()[0]
    console.log("Kicking off the task")
    # TODO make env configurable
    @ptyProcess = Task.once Pty, path.resolve(projectPath), "/Users/jason/work/bin/lein", ["trampoline", "run", "-m", "clojure.main"]

  getTitle: ->
    "The REPL"

