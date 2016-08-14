# Creates a decoration handler for a loading spinner using
# https://github.com/tobiasahlin/SpinKit/ templates
module.exports =
class Spinner

  constructor: () ->
    # only one loading decorator per editor is allowed
    @decorationsByEditorId = {}

  widget: () ->
    widget = document.createElement 'div'
    # widget.id = 'proto-repl-spinner'
    widget.classList.add('sk-folding-cube')
    widget.innerHTML = """
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    """
    return widget

  startAt: (editor, range) =>
    return unless editor and range

    type = 'overlay'
    decorations = @decorationsByEditorId[editor.id]
    # create a map to store decorators if it doesn't exists
    if decorations is undefined
      decorations = new Map()
      @decorationsByEditorId[editor.id] = decorations

    item = @widget()
    marker = editor.markBufferRange(range)
    decoration = editor.decorateMarker(marker, {type, item})
    # keep track of editor - marker relationship
    id = Date.now() # id of the spinner
    decorations.set(id, decoration)
    return id

  stop: (editor, id) =>
    return unless editor
    decorations = @decorationsByEditorId[editor.id]
    return unless decorations
    # remove the oldest if no timestamp was passed
    if not id?
      timestamps = Array.from(decorations.keys())
      id = Math.min.apply(null, timestamps)
    decorations.get(id)?.destroy()
    decorations.delete(id)

  clearAll: ()->
    for editorId,decorations of @decorationsByEditorId
      decorations.forEach (decoration, id) =>
        decoration.destroy()
    @decorationsByEditorId = {}
