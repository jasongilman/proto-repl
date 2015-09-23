{$, ScrollView} = require 'atom-space-pen-views'
{Task} = require 'atom'
path = require 'path'
Pty = require.resolve './process'

module.exports = 
class ReplScrollView extends ScrollView
  @content: ->
    @div class: 'replOutput', outlet: 'replOutput', =>
      @div("Starting")

  initialize: ->
    super()
    projectPath = atom.project.getPaths()[0]
    # TODO make env configurable
    @ptyProcess = Task.once Pty, path.resolve(projectPath), "/Users/jason/work/bin/lein", ["trampoline", "run", "-m", "clojure.main"]
    @attachListeners()

  attachListeners: ->
    @ptyProcess.on 'proto-repl-process:data', (data) =>
      newElement = $( "<p>" + data + "</p>" )
      @append(newElement)


  getTitle: ->
    "The REPL"

