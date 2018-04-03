{CompositeDisposable} = require 'atom'

exampleTree =
  # Extra 2 spaces at the beginning of the first row to line things up
  ["                                      m |         a | b |",
   ["                                   {} |   :apples | 2 |",
      "m: {}",
      "a: :apples",
      "b: 2"],
   ["                          {:apples 2} |  :oranges | 3 |",
     "m: {:apples 2}",
     "a: :oranges",
     "b: 3"],
   ["              {:apples 2, :oranges 3} | :cherries | 4 |",
     "m: {:apples 2, :oranges 3}",
     "a: :cherries",
     "b: 4"],
   [" {:apples 2, :oranges 3, :cherries 4} |   :apples | 7 |",
     "m: {:apples 2, :oranges 3, :cherries 4}",
     "a: :apples",
     "b: 7"]]


module.exports =

class SaveRecallFeature

  # Instance of the repl
  protoRepl: null
  subscriptions: null
  lastDisplayedData: {}

  constructor: (@protoRepl)->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace',
      'proto-repl:insert-save-value-call': =>@insertSaveValueCall()
      'proto-repl:display-saved-values': =>@fetchAndDisplaySavedValues()
      'proto-repl:clear-saved-values': =>@clearSavedValues()

  deactivate: ->
    @subscriptions.dispose()
    @lastDisplayedData = {}

  # Inserts a call to save some data with a uniquely generated id
  insertSaveValueCall: ->
    if editor = atom.workspace.getActiveTextEditor()
      @nextUniqueSaveId ||= 1
      editor.insertText("(proto-repl.saved-values/save #{@nextUniqueSaveId})")
      @nextUniqueSaveId += 1

  # Clears any displayed saved values and any values saved in the proto namespace.
  clearSavedValues: ->
    @protoRepl.executeCode "(proto-repl.saved-values/clear-saved-values!)", displayInRepl: false
    @lastDisplayedData = {}
    if editor = atom.workspace.getActiveTextEditor()
      atom.commands.dispatch(atom.views.getView(editor), 'inline-results:clear-all')


  # Fetches the latest saved values and displays them inline nest to the code.
  fetchAndDisplaySavedValues: ->
    # Fetch the latest saved values
   @protoRepl.executeCode "(proto-repl.saved-values/saved-values)",
      displayInRepl: false
      resultHandler: (result, options)=>
        if result.error
          @protoRepl.stderr("Error polling for saved values #{result.error}")
          return

        # Convert the saved values into a map of uniq forms to the display trees
        jsEdn = @protoRepl.parseEdn(result.value)
        uniqsToTrees = @protoRepl.ednSavedValuesToDisplayTrees(result.value)

        for [uniq, tree] in uniqsToTrees
          displayData = jsEdn[uniq]
          dataVersion = displayData[displayData.length - 1].version
          if @lastDisplayedData[uniq] != dataVersion
            @lastDisplayedData[uniq] = dataVersion
            # find the unique form in an editor
            if foundRange = @protoRepl.EditorUtils.findEditorRangeContainingString(uniq)
              [editor, range] = foundRange
              # Display the saved values inline next to the call to save them.
              @protoRepl.repl.displayInline(editor, range, tree)

  # Starts polling for updated saved values
  startSavedInlineDisplayPolling: ->
    @pollingId = setInterval(=>
                      @fetchAndDisplaySavedValues()
                    , 5000)

  # Stops polling for updated saved values
  stopSavedInlineDisplayPolling: ->
    clearInterval(@pollingId)
