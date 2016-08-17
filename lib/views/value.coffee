
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

# Takes a value from the nrepl and returns an HTML/js object to display
render = (result) ->
  if result.value
    tree = ednToDisplayTree(result.value)
    return recurseTree(tree)
  else if result.ex
    if result.ex.indexOf('\n') == -1
      pre = document.createElement("div")
      pre.style.whiteSpace = 'pre'
      pre.innerHTML = result.ex
      return pre
    else
      return recurseTree(result.ex.split('\n'))
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
}
