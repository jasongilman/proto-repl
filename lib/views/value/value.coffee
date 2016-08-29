
TreeView = require './tree-view'# temporary usage of copy of Atom Ink Tree view

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
stacktrace = (rawText, widget, ink) ->
  lines = rawText.split('\n')
  # extract ns, fn and line number
  stackFrame = /(\S+?)\/([^\s\/]+).*?\.clj:(\d+)/
  evalfn = /eval\d+/ # anonymous function created by clojure
  # extract file:number and the text to the left
  link = /(.*?)(\(\S+:\d+\))/
  stack = []
  highlighters = []
  for line in lines
    frame = stackFrame.exec(line)
    if frame is null # not a stacktrace frame
      stack.push(line)
      continue

    [_, ns, fn, lineno] = frame
    if ns.startsWith('clojure') # ignore clojure internal calls
      stack.push(line)          # we cannot get its filepath anyway
      continue
    if evalfn.exec(fn) isnt null # ignore clojure anonymous eval calls created
      stack.push(line)           # by the repl
      continue

    symbol = "\#\'#{ns}/#{fn}" # rebuild clojure symbol
    [match, text, fileNum] = link.exec(line)
    frameText = document.createElement('span')
    frameText.innerHTML = text
    frameLink = document.createElement('a')
    frameLink.style.color = "#ED4337"
    frameLink.style.fontStyle = "italic"
    frameLink.innerHTML = fileNum
    frameLink.href = '#'
    frame = document.createElement('div')
    frame.appendChild(frameText)
    frame.appendChild(frameLink)
    stack.push(frame) # make the hyperlink and text part of the stacktrace
    do (symbol, lineno, frameLink) -> # avoid losing bindings
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
          frameLink.onclick = ->
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
  # finally return a renderable tree struct
  return stack

# Takes a value from the nrepl and returns an HTML/js object to display
render = (result, widget, ink) ->
  if result.value
    tree = protoRepl.ednToDisplayTree(result.value)
    return recurseTree(tree)
  else if result.ex
    if result.ex.indexOf('\n') == -1
      return recurseTree([result.ex])
    else
      return recurseTree(stacktrace(result.ex, widget, ink))
  else if result.doc # fake result but custom display ;)
    return recurseTree(result.doc)

# takes a msg from the nrepl and returns an object with all necessary options
# to display it as an ink-inline-result
options = (result) ->
  return {
    # use a block result if the exception has more than 100 characters
    type: if result.ex? and result.ex.length > 100 then 'block' else 'inline',
    error: result.ex?,
    loading: false
  }

# we export this way to avoid having to use 'this/@' on the functions calls
# thus, we can have namespaced pure functions which don't care about the
# current scope
module.exports = {
  recurseTree: recurseTree,
  render: render,
  options: options,
  stacktrace: stacktrace
}
