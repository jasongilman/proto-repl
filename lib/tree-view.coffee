# This is a modification of the tree view from Atom Ink. It adds the ability to
# add buttons to the tree view lines.

{$, $$} = require 'atom-space-pen-views'

treeButtonClasses = ({button_class})->
  'btn btn-xs inline-block-tight ' + button_class

treeButtonClicked = ({button_fn}, textDiv)->
  textDiv.classList.add('clicking-btn')
  setTimeout(=>
    textDiv.classList.remove('clicking-btn')
  , 250)
  button_fn()


module.exports =

  leafView: (leaf, btnOptions) ->
      view = $$ ->
        @div class: 'ink leaf', =>
          if btnOptions.button_text
            @button class: treeButtonClasses(btnOptions), btnOptions.button_text
          @span class: 'text'
      # Setup the header
      header = view.find('.text')
      header.append leaf

      if btnOptions.button_fn
        btn = view.find('.btn')
        window.sampleBtn = btn
        btn.click => treeButtonClicked(btnOptions, view[0])

      view[0]

  treeView: (head, children, btnOptions) ->
    view = $$ ->
      @div class: 'ink proto-tree', =>
        @span class: 'expandable icon icon-chevron-right'
        @div class: 'header gutted', =>
          if btnOptions.button_text
            @button class: treeButtonClasses(btnOptions), btnOptions.button_text
          @span class: 'text'
        @div class: 'body gutted'

    # Setup the header
    header = view.find('.text')
    header.append head
    header.click => @toggle view

    if btnOptions.button_fn
      btn = view.find('.btn')
      btn.click => treeButtonClicked(btnOptions, view[0])

    # Setup the body
    body = view.find('> .body')
    body.hide()
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
