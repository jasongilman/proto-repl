{CompositeDisposable} = require 'atom'
ReplScrollView = require './repl-scroll-view'
url = require 'url'

module.exports = ProtoRepl =
  subscriptions: null

  # iex way
  # replScrollView: null

  activate: (state) ->
    # markdown preview way
    atom.workspace.addOpener (uriToOpen) ->
      console.log("Opening:" + uriToOpen)
      try
        {protocol} = url.parse(uriToOpen)
      catch error
        return
      console.log("Protocol:" + protocol)

      return unless protocol is 'repl-scroll-view:'
      console.log("returning a new repl scroll view")
      repl = new ReplScrollView()
      # TODO temporary for debugging
      global.lastRepl = repl
      repl

    # iex way
    # @replScrollView = new ReplScrollView()

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'proto-repl:toggle': => @toggle()

  deactivate: ->
    @subscriptions.dispose()
    # iex way
    # @replScrollView.destroy()

  serialize: ->
    {}

  toggle: ->
    console.log 'ProtoRepl was toggled!'
    
    # markdown preview way
    atom.workspace.open("repl-scroll-view://nothing")

    # iex way
    # pane = atom.workspace.getActivePane()
    # item = pane.addItem @replScrollView
    # pane.activateItem item

