
edn_reader = require '../proto_repl/proto_repl/edn_reader.js'
TreeView = require '../tree-view'# temporary usage of copy of Atom Ink Tree view

# Parses the edn string and returns a displayable tree.  A tree is an array
# whose first element is a string of the root of the tree. The rest of the
# elements are branches off the root. Each branch is another tree. A leaf is
# represented by a vector of one element.
ednToDisplayTree = (ednString) ->
  try
    edn_reader.to_display_tree(ednString)
  catch error
    # Some responses from the REPL may be unparseable as in the case of var refs
    # like #'user/reset. We'll just return the original string in that case.
    return [ednString]

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
prettyException = (result, widget, ink) ->
  lines = result.ex.split('\n')
  stackFrame = /(\S+?)\/([^\s\/]+).*?\.clj:(\d+)/ # (ns | .)* / fn
  evalfn = /eval\d+/ # anonymous function created by clojure
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
    stack.push(line)
    # TODO: create an <a> and link it to the file
    # use (.*?)(\(\S+:\d+\)) regex to insert hyperlinks to the exception
    do (symbol, lineno) -> # avoid losing bindings
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
  # yet another HACK !!
  # we could change this after ink is updated see:
  # github.com/JunoLab/atom-ink/commit/095fb1d73907c562f462b8d66e846cfd17a72ea3
  destroyResult = widget.destroy.bind widget
  widget.destroy = () ->
    highlight.destroy() for highlight in highlighters
    destroyResult()
  # finally let's build the tree
  return recurseTree(stack, {}, stack)

# Takes a value from the nrepl and returns an HTML/js object to display
render = (result) ->
  if result.value
    tree = ednToDisplayTree(result.value)
    return recurseTree(tree)
  else if result.ex
    if result.ex.indexOf('\n') == -1
      return recurseTree([result.ex])
    else
      return null
      # this is a HACK !!
      # we return null and wait for an ink-result. We then call prettyException
      # and set its content with (highlights + hyperlinks)
  else if result.doc # fake result but custom display ;)
    return recurseTree(result.doc)

# takes a msg from the nrepl and returns an object with all necessary options
# to display it as an ink-inline-result
inkResult = (result) ->
  return { # use a block result if the exception has more than 100 characters
    type: if result.ex? and result.ex.length > 100 then 'block' else 'inline',
    error: result.ex?
    content: render(result)
  }

# we export this way to avoid having to use 'this/@' on the functions calls
# thus, we can have namespaced pure functions which don't care about the
# current scope
module.exports = {
  ednToDisplayTree: ednToDisplayTree,
  recurseTree: recurseTree,
  render: render,
  inkResult: inkResult
  prettyException: prettyException
}
