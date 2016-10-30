{Range, Point, Emitter} = require 'atom'
ReplHistory = require './repl-history'

# Delimits the output area from the text entry area.
EDIT_DELIMITER="--------------------\n"

TAB_TITLE = "Clojure REPL"

module.exports =

# Creates and configures an Atom Text Editor to act as the REPL. The text editor
# has various functions overwritten to make it behave in a specialized fashion.
# The top of the text editor area does not allow editing. It is used for output
# from executed code. The bottom of the text editor is used for entry of code
# to execute
class ReplTextEditor
  emitter: null

  # The captured real text editor
  textEditor: null

  # Boolean indicates if the underlying text editor should allow text to be modified
  # in any area of the REPL
  allowAnyChange: false

  # The index of the row that demarcates output area from text entry area.
  delimiterRow: 0

  # Keeps track of the REPL history.
  replHistory: null


  constructor: ()->
    @emitter = new Emitter
    if atom.config.get("proto-repl.openReplInRightPane")
      options = {split: 'right'}
    else
      options = {}
      # Opens the text editor that will represent the REPL.
    atom.workspace.open(TAB_TITLE, options).done (textEditor) =>
      window.textEditor = textEditor
      @configureNewTextEditor(textEditor)
      @emitter.emit 'proto-repl-text-editor:open'

      @replHistory = new ReplHistory()
      # Connect together repl text editor and history
      @onHistoryBack =>
        @replHistory.setCurrentText(@enteredText())
        @setEnteredText(@replHistory.back())

      @onHistoryForward =>
        @replHistory.setCurrentText(@enteredText())
        @setEnteredText(@replHistory.forward())


  # Calls the callback after the text editor has been opened.
  onDidOpen: (callback)->
    if @textEditor
      # Already open
      callback()
    else
      @emitter.on 'proto-repl-text-editor:open', callback

  # Calls the callback after the text editor window has been closed.
  onDidClose: (callback)->
    @emitter.on 'proto-repl-text-editor:close', callback

  # Clears all output and text entry in the REPL.
  clear: ->
    if @textEditor
      @modifyTextWith =>
        @textEditor.setText(EDIT_DELIMITER)
        # Set the delimiter row index so we can keep track of where the user can type.
        @delimiterRow = 0

  # Returns the range where entered text is typed
  enteredTextRange: ->
    start = new Point(@delimiterRow+1)
    end = @textEditor.buffer.getEndPosition()
    new Range(start, end)

  # Returns the current text typed in the entry area.
  enteredText: ->
    @textEditor.getTextInBufferRange(@enteredTextRange())

  # Sets the text in the entry area.
  setEnteredText: (text)->
    @modifyTextWith =>
      @textEditor.setTextInBufferRange(@enteredTextRange(), text)

  # Clears any entered text typed in the entry area.
  clearEnteredText: ->
    @setEnteredText("")

  # Modifies the text in the text area directly with the given function. This is
  # normally not allowed but this overrides the protects
  modifyTextWith: (f)->
    @allowAnyChange = true
    f()
    @allowAnyChange = false

  onHistoryBack: (callback)->
    @emitter.on 'proto-repl-text-editor:history-back', callback

  onHistoryForward: (callback)->
    @emitter.on 'proto-repl-text-editor:history-forward', callback

  ##############################################################################
  ## Text Editor Configuration

  configureTextEditorBasics: ()->
    # Add a class to the text editor so it can be styled
    @textEditor.editorElement.className += " proto-repl-repl"

    # Force the tab to have a title
    @textEditor.getTitle = -> TAB_TITLE
    @textEditor.emitter.emit 'did-change-title', TAB_TITLE

    # Change the text editor so it will never require saving.
    @textEditor.isModified = -> false

    # Configure text editor for clojure syntax highlighting
    if atom.config.get('proto-repl.useClojureSyntax')
      grammar = atom.grammars.grammarForScopeName('source.clojure')
      @textEditor.setGrammar(grammar)

    # Set the text editor not to be wrapped.
    @textEditor.setSoftWrapped(true)

  configureTextEditorClose: ()->
    @textEditor.onDidDestroy =>
      @emitter.emit 'proto-repl-text-editor:close'
      @textEditor = null

  # Returns true if the range is entirely in the text entry area.
  allowsRangeChange: (range)->
    range.start.row > @delimiterRow && range.end.row > @delimiterRow

  # Returns true if the change to the text editor content is allowed.
  allowsChange: (change)->
    @allowAnyChange || (@allowsRangeChange(change.newRange) && @allowsRangeChange(change.oldRange))

  # Configures text editor by overriding methods to prevent text entry above
  # delimiter row.
  configureBufferChanges: ()->
    @clear()
    shouldAllowChange = (change)=> @allowsChange(change)
    # Replace buffer applyChange with our own that decides when the change
    # can be applied
    @textEditor.buffer.oldApplyChange = @textEditor.buffer.applyChange
    @textEditor.buffer.applyChange = (change) ->
      {newStart, oldExtent, newExtent} = change
      start = Point.fromObject(newStart)
      changeForCompare =
        oldRange: Range(start, start.traverse(oldExtent))
        newRange: Range(start, start.traverse(newExtent))

      if shouldAllowChange(changeForCompare)
        @oldApplyChange(change)

  # Configures text editor to detect cursor movement indicating forward and backward
  # in history navigation.
  configureHistorySupport: ->
    # Add history backward
    atTopOfEditArea = (editor)=>
      editor.getCursorBufferPosition().row-1 == @delimiterRow

    triggerHistoryBack = =>
      @emitter.emit "proto-repl-text-editor:history-back"

    @textEditor.oldMoveUp = @textEditor.moveUp
    @textEditor.moveUp = (lineCount)->
      if atTopOfEditArea(this)
        triggerHistoryBack()
      else
        @oldMoveUp(lineCount)

    # Add history forwoard
    atBottomOfEditArea = (editor)=>
      editor.getCursorBufferPosition().row == editor.buffer.getEndPosition().row

    triggerHistoryForward = =>
      @emitter.emit "proto-repl-text-editor:history-forward"

    @textEditor.oldMoveDown = @textEditor.moveDown
    @textEditor.moveDown = (lineCount)->
      if atBottomOfEditArea(this)
        triggerHistoryForward()
      else
        @oldMoveDown(lineCount)

  # Configures a new text editor.
  configureNewTextEditor: (textEditor)->
    @textEditor = textEditor
    @configureTextEditorBasics()
    @configureTextEditorClose()
    @configureBufferChanges()
    @configureHistorySupport()

  autoscroll: ->
    if atom.config.get('proto-repl.autoScroll')
      @textEditor?.scrollToBufferPosition([@textEditor?.getLastBufferRow(), 0])

  # Appends text to the display area of the text editor
  appendText: (text, waitUntilOpen=false)->
    if waitUntilOpen && !@textEditor
      @onDidOpen =>
        @appendText(text)
    else if @textEditor && text.length > 0

      # Append newline to text if it doesn't end with one.
      if text[text.length-1] != "\n"
        text = text + "\n"

      @modifyTextWith =>
        insertionPoint = new Point(@delimiterRow)
        insertRange = @textEditor.getBuffer().insert(insertionPoint, text)
        @delimiterRow = insertRange.end.row

      @autoscroll()

  info: (text)->
    @appendText(text, true)

  stderr: (text)->
    @appendText(text)

  stdout: (text)->
    @appendText(text)

  result: (text)->
    @appendText(text)

  displayExecutedCode: (code)->
    @appendText(code)

  # Executes the text that was entered in the entry area
  executeEnteredText: ->
    if editor = atom.workspace.getActiveTextEditor()
      if editor == @textEditor
        code = @enteredText()
        @clearEnteredText()
        @replHistory.setLastTextAndAddNewEntry(code)
        # Wrap code in do block so that multiple statements entered at the REPL
        # will execute all of them
        window.protoRepl.executeCode("(do #{code})", displayCode: code)
