{Range, Point, Emitter} = require 'atom'

module.exports =

# TODO comment this
class InkConsole
  emitter: null

  constructor: ()->
    @emitter = new Emitter

    # TODO emit this
    # @emitter.emit 'proto-repl-ink-console:open'

  # Calls the callback after the text editor has been opened.
  onDidOpen: (callback)->
    # TODO what's the instance called?
    # if @textEditor
    #   # Already open
    #   callback()
    # else
    #   @emitter.on 'proto-repl-ink-console:open', callback
    null

  # Calls the callback after the text editor window has been closed.
  onDidClose: (callback)->
    @emitter.on 'proto-repl-ink-console:close', callback

  # Clears all output and text entry in the REPL.
  clear: ->
    # TODO implement this
    null

  # TODO do we need history?
  # onHistoryBack: (callback)->
  #   @emitter.on 'proto-repl-ink-console:history-back', callback
  #
  # onHistoryForward: (callback)->
  #   @emitter.on 'proto-repl-ink-console:history-forward', callback


  # Appends text to the display area of the text editor
  appendText: (text, waitUntilOpen=false)->
    # TODO implement this
    null
