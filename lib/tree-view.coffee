# A temporary copy of Atom Ink Tree View until this pull request is merged
# https://github.com/JunoLab/atom-ink/pull/44

{$, $$} = require 'atom-space-pen-views'

# TODO Note this is a deviation from atom ink here. If we want to reuse their
# code we'll need to backport it to that.

module.exports =

  leafView: (leaf, {button_text, button_class, button_fn}) ->
      view = $$ ->
        @div =>
          @span class: 'text'
          if button_text
            @button class: 'clickable-inline-leaf btn btn-xs btn-primary inline-block-tight', button_text

      # Setup the header
      header = view.find('.text')
      header.append leaf

      if button_fn
        btn = view.find('.clickable-inline-leaf')
        btn.click => button_fn()

      view[0]

  treeView: (head, children, {expand, button_text, button_class, button_fn}) ->
    view = $$ ->
      @div class: 'ink tree', =>
        @span class: 'expandable icon icon-chevron-right'
        @div class: 'header gutted', =>
          @span class: 'text'
          if button_text
            @button class: 'clickable-inline btn btn-xs btn-primary inline-block-tight', button_text
        @div class: 'body gutted'

    # Setup the header
    header = view.find('.text')
    header.append head
    header.click => @toggle view

    if button_fn
      btn = view.find('.clickable-inline')
      btn.click => button_fn()

    # Setup the body
    body = view.find('> .body')
    body.hide() unless expand
    # Add the children to the body. Using direct dom manipulation instead of
    # jQuery to improve performance in the presence of many children.
    realBody = body[0]
    for child in children
      realBody.appendChild child

    view.find('> .expandable').click => @toggle view

    view[0]

  toggle: (view) ->
    view = $(view)
    body = view.find('> .body')
    icon = view.find('> .expandable')
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
