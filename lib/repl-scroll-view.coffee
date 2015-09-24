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
    super
    projectPath = atom.project.getPaths()[0]
    # TODO make env configurable
    @ptyProcess = Task.once Pty, path.resolve(projectPath), "/Users/jason/work/bin/lein", ["trampoline", "run", "-m", "clojure.main"]
    @attachListeners()

  attachListeners: ->
    @ptyProcess.on 'proto-repl-process:data', (data) =>
      newElement = $( "<p>" + data + "</p>" )
      @append(newElement)
      @scrollToBottom()

    console.log @element
    atom.commands.add @element,
      'core:move-up': =>
        console.log("scrolling up")
        @scrollUp()
      'core:move-down': =>
        console.log("scrolling down")
        @scrollDown()
      'core:copy': (event) =>
        console.log("copying")
        event.stopPropagation() if @copyToClipboard()

  getTitle: ->
    "The REPL"

  sendToRepl: (text)->
    console.log("Sending to repl: " + text)
    @ptyProcess.send event: 'input', text: text



