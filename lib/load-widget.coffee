# fs = require 'fs'
# path = require 'path'

# Creates a decoration handler for a loading spinner using
# https://github.com/tobiasahlin/SpinKit/ templates

module.exports =
class Spinner
  # TODO: transform this into a singleton pattern
  constructor: () ->
    # only one loading decorator per editor is allowed
    @decorationsByEditorId = {}
    @widget = document.createElement 'div' # + id = proto-repl-spinner
    # widget.id = 'proto-repl-spinner'
    @widget.classList.add('sk-folding-cube')
    @widget.innerHTML = """
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    """

  start: (editor) =>
    return unless editor

    timestamp = Date.now() # id of the spinner
    type = 'overlay'
    decoration = @decorationsByEditorId[editor.id]
    # reset the decorator if there was already one
    if decoration?
      decoration.destroy()
      @decorationsByEditorId[editor.id] = null

    item = @widget
    marker = editor.getLastCursor().marker
    # create a decoration that follows the marker. A Decoration object is
    # returned which can be updated
    decoration = editor.decorateMarker(marker, {type, item})
    decoration.timestamp = timestamp
    # keep track of editor - marker relationship
    @decorationsByEditorId[editor.id] = decoration
    return timestamp

  stop: (editor, timestamp = Date.now()) =>
    return unless editor
    decoration = @decorationsByEditorId[editor.id]
    # To avoid bugs with asynchronous answers, we only allow to destroy the last
    # decorator created. They are always destroyed if the timestamp is missing
    if decoration? & (timestamp >= decoration.timestamp)
      decoration.destroy()
      @decorationsByEditorId[editor.id] = null

  isLoading: (editor) ->
    decoration = @decorationsByEditorId[editor.id]
    return decoration?
