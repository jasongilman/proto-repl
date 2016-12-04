
# inline results related functionality
# All necessary pieces to display values, docs and exceptions as html/js objects
# is done here

TreeView = require './tree-view' # temporary usage of copy of Atom Ink Tree view
Stacktrace = require './stacktrace'

# A recursive function that can convert a tree of values to
# display into an Atom Ink tree view. Sub-branches are expandable.
recurseTree = ([head, button_options, children...]) ->
  if children && children.length > 0
    childViews = children.map  (x) ->
      if x instanceof Array
        recurseTree(x)
      else # The button options here are for the head not the child
        TreeView.leafView(x,{})
    TreeView.treeView(head, childViews, button_options)
  else
    TreeView.leafView(head, button_options || {})

# Modify an existing ink-result (widget) to display a customized exception with
# highlighting and hyperlinks
exception = (rawText, widget, ink) ->
  parser = Stacktrace.getParser(rawText)
  if parser is null # unsupported stacktrace
    view = Stacktrace.summary(rawText)
    return [view[0], null] # return preformated text

  [cause, lines] = Stacktrace.splitContent(parser, rawText)
  stack = []
  highlighters = []
  for line in lines
    frame = Stacktrace.parseLine(parser, line)
    if frame is null # not a stacktrace frame
      view = Stacktrace.frame(line, '','')
      stack.push(view[0])
      continue

    [ns, fn, lineno] = frame
    symbol = "\#\'#{ns}/#{fn}" # rebuild clojure symbol
    [left, hyperlink, right] = Stacktrace.divideLine(parser, line)
    view = Stacktrace.frame(left, hyperlink, right)
    stack.push(view[0])
    anchor = view.find('a')
    do (symbol, lineno, anchor) -> # avoid losing bindings
      protoRepl.executeCode "(let [path (:file (meta #{symbol}))]
                              (if (.startsWith path (System/getProperty \"user.dir\"))
                                path
                                (.getPath (clojure.java.io/resource path))))",
      displayInRepl: false
      resultHandler: (res, opts) ->
        if res.value
          filepath = protoRepl.parseEdn(res.value)
          light = ink.highlights.errorLines [file: filepath, line: +lineno - 1]
          highlighters.push(light)
          anchor.on 'click', ->
            atom.workspace.open filepath,
              initialLine: +lineno - 1
              searchAllPanes: true
  # yet another HACK !!
  # we could change this after ink is updated see:
  # github.com/JunoLab/atom-ink/commit/095fb1d73907c562f462b8d66e846cfd17a72ea3
  destroyResult = widget.destroy.bind widget
  widget.destroy = () ->
    highlight.destroy() for highlight in highlighters
    destroyResult()
  # finally return a renderable tree struct (head, body)
  return [Stacktrace.summary(cause)[0], stack]

# Takes a value from the nrepl and returns an HTML/js object to display
module.exports.render = (result, widget, ink) ->
  if result.value
    tree = protoRepl.ednToDisplayTree(result.value)
    return recurseTree(tree)
  else if result.ex
    [summary, content] = exception(result.ex, widget, ink)
    return summary unless content
    return ink.tree.treeView(summary, content, expand: false)
  else if result.doc # fake result but custom display ;)
    return recurseTree(result.doc)

# takes a msg from the nrepl and returns an object with all necessary options
# to display it as an ink-inline-result
module.exports.options = (result) ->
  return {
    # use a block result if the exception has more than 100 characters
    type: if result.ex? and result.ex.length > 100 then 'block' else 'inline',
    error: result.ex?,
    loading: false
  }
