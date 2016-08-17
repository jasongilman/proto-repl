
edn_reader = require '../proto_repl/proto_repl/edn_reader.js'
TreeView = require '../tree-view'# temporary usage of copy of Atom Ink Tree view

module.exports =
# Parses the edn string and returns a displayable tree.  A tree is an array
# whose first element is a string of the root of the tree. The rest of the
# elements are branches off the root. Each branch is another tree. A leaf is
# represented by a vector of one element.
ednToDisplayTree: (ednString)->
  try
    edn_reader.to_display_tree(ednString)
  catch error
    # Some responses from the REPL may be unparseable as in the case of var refs
    # like #'user/reset. We'll just return the original string in that case.
    return [ednString]

# A recursive function that can convert a tree of values to
# display into an Atom Ink tree view. Sub-branches are expandable.
recurseTree: ([head, button_options, children...]) ->
  if children && children.length > 0
    childViews = children.map  (x) ->
      if x instanceof Array
        recurseTree(x)
      else # The button options here are for the head not the child
        TreeView.leafView(x,{})
    TreeView.treeView(head, childViews, button_options)
  else
    TreeView.leafView(head, button_options || {})

# checks whether or not a message to stderr matches a stacktrace pattern
isStacktrace: (error) ->
  return false
  # if clj_stacktrace(error)
  #   return true
  # else if clojure_core_stacktrace(error)
  #   return true
  # else if clojure_repl_pst(error)
  #   return true
  # else
  #   return false

# Takes a value from the nrepl and returns an HTML/js object to display
render: (result) ->
  if result.value
    tree = @ednToDisplayTree(result.value)
    return @recurseTree(tree)
  else if result.err
    return result.err
    # renderError(result.err)
  else if result.ex
    return @recurseTree([result.ex])

# takes a msg from the nrepl and returns an object with all necessary options
# to display it as an ink-inline-result
inkResult: (result) ->
  return {
    type: 'inline',
    error: if result.ex then true else false,
    content: @render(result)
}
