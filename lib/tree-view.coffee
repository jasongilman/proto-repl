# A temporary copy of Atom Ink Tree View until this pull request is merged
# https://github.com/JunoLab/atom-ink/pull/44

{$, $$} = require 'atom-space-pen-views'

module.exports =
  treeView: (head, children, {expand}) ->
    view = $$ ->
      @div class: 'ink tree', =>
        @span class: 'icon icon-chevron-right'
        @div class: 'header gutted'
        @div class: 'body gutted'

    # Setup the header
    header = view.find('> .header')
    header.append head
    header.click => @toggle view

    # Setup the body
    body = view.find('> .body')
    body.hide() unless expand
    # Add the children to the body. Using direct dom manipulation instead of
    # jQuery to improve performance in the presence of many children.
    realBody = body[0]
    for child in children
      realBody.appendChild child

    view.find('> .icon').click => @toggle view

    view[0]

  toggle: (view) ->
    view = $(view)
    body = view.find('> .body')
    icon = view.find('> .icon')
    return unless body[0]?
    body.toggle()
    if body.isVisible()
      view.visible = true
      icon.removeClass 'icon-chevron-right'
      icon.addClass 'icon-chevron-down'
    else
      view.visible = false
      icon.removeClass 'icon-chevron-down'
      icon.addClass 'icon-chevron-right'
