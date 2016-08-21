# This is a modification of the tree view from Atom Ink. It adds the ability to
# add buttons to the tree view lines.

views =
  dom: ({tag, attrs, contents}) ->
    view = document.createElement tag
    for k, v of attrs
      view.setAttribute k, v
    if contents?
      if contents.constructor isnt Array
        contents = [contents]
      for child in contents
        view.appendChild @render child
    view

  views:
    dom: (a...) -> views.dom  a...

  render: (data) ->
    if @views.hasOwnProperty(data.type)
      @views[data.type](data)
    else if data?.constructor is String
      new Text data
    else
      data

  tag: (tag, attrs, contents) ->
    if attrs?.constructor is String
      attrs = class: attrs
    if attrs?.constructor isnt Object
      [contents, attrs] = [attrs, undefined]
    type: 'dom'
    tag: tag
    attrs: attrs
    contents: contents

  tags: {}

['div', 'span', 'a', 'strong', 'table', 'tr', 'td', 'button'].forEach (tag) ->
  views.tags[tag] = (attrs, contents) ->
    views.tag tag, attrs, contents

{div, span, button} = views.tags

treeButtonClasses = ({button_class})->
  'btn btn-xs ' + button_class

treeButtonClicked = ({button_fn}, textDiv)->
  textDiv.classList.add('clicking-btn')
  setTimeout(=>
    textDiv.classList.remove('clicking-btn')
  , 250)
  button_fn()


module.exports =

  leafView: (leaf, btnOptions) ->
    textSpan = span('text', leaf)
    if btnOptions.button_text
      btn = button(treeButtonClasses(btnOptions), btnOptions.button_text)
      view = views.render(div('ink leaf', [btn, textSpan]))
      # Add the click handler
      view.querySelector('button').onclick = => treeButtonClicked(btnOptions, view)
    else
      view = views.render(div('ink leaf', [textSpan]))
    view

  treeView: (head, children, btnOptions) ->
    icon = span('icon icon-chevron-right open')
    body = div('body gutted', children)

    if btnOptions.button_text
      btn = button(treeButtonClasses(btnOptions), btnOptions.button_text)
      header = div("header gutted", [span('header-text', [head]), btn])
      children = [icon, header, body]
    else
      header = div("header gutted", [span('header-text', [head])])
      children = [icon, header, body]

    view = views.render(div('ink proto-tree', children))
    if btnOptions.button_text
      view.querySelector('button').onclick = => treeButtonClicked(btnOptions, view)

    for sel in [':scope > .header > .header-text', ':scope > .icon']
      view.querySelector(sel).onclick = =>
        setTimeout (=> @toggle view), 0
    @toggle view
    view


  toggle: (view) ->
    body = view.querySelector ':scope > .body'
    icon = view.querySelector ':scope > .icon'
    return unless body?
    if body.style.display == ''
      body.style.display = 'none'
      icon.classList.remove 'open'
    else
      body.style.display = ''
      icon.classList.add 'open'
