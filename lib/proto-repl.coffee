# ProtoReplView = require './proto-repl-view'
{CompositeDisposable} = require 'atom'
ReplScrollView = require './repl-scroll-view'

module.exports = ProtoRepl =
  # protoReplView: null
  # modalPanel: null
  subscriptions: null
  replScrollView: null
  rightPanel: null

  activate: (state) ->
    # @protoReplView = new ProtoReplView(state.protoReplViewState)
    # @modalPanel = atom.workspace.addModalPanel(item: @protoReplView.getElement(), visible: false)
    @replScrollView = new ReplScrollView()

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'proto-repl:toggle': => @toggle()

  deactivate: ->
    # @modalPanel.destroy()
    @subscriptions.dispose()
    # @protoReplView.destroy()

  serialize: ->
    # protoReplViewState: @protoReplView.serialize()

  toggle: ->
    console.log 'ProtoRepl was toggled!'
    @rightPanel = atom.workspace.addRightPanel(item: @replScrollView)

    # if @modalPanel.isVisible()
      # @modalPanel.hide()
    # else
      # @modalPanel.show()
