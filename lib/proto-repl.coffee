{CompositeDisposable} = require 'atom'
ReplScrollView = require './repl-scroll-view'
ReplTextEditor = require './repl-text-editor'
url = require 'url'

module.exports = ProtoRepl =
  subscriptions: null
  lastRepl: null

  activate: (state) ->
    # markdown preview way
    # atom.workspace.addOpener (uriToOpen) =>
    #   console.log("Opening:" + uriToOpen)
    #   try
    #     {protocol} = url.parse(uriToOpen)
    #   catch error
    #     return
    #   console.log("Protocol:" + protocol)

    #   return unless protocol is 'repl-scroll-view:'
    #   console.log("returning a new repl scroll view")
    #   @lastRepl = new ReplScrollView()
    #   # TODO temporary for debugging
    #   global.lastRepl = @lastRepl
    #   @lastRepl

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'proto-repl:toggle': => @toggle()
    @subscriptions.add atom.commands.add 'atom-workspace',
      'proto-repl:execute-selected-text': => @executeSelectedText()

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->
    {}

  toggle: ->
    console.log 'ProtoRepl was toggled!'
    
    # markdown preview way
    # atom.workspace.open("repl-scroll-view://nothing")

    # Using text editor directly way
    @lastRepl = new ReplTextEditor()


  executeSelectedText: ->
    if editor = atom.workspace.getActiveTextEditor()
       selection = editor.getSelectedText()
       @lastRepl.sendToRepl(selection + "\n")



