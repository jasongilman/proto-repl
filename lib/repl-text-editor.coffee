{Range, Point, Emitter} = require 'atom'

# TODO handle the resizing of the text editor or consider making it smaller
EDIT_DELIMITER="--------------------\n"

TAB_TITLE = "Clojure REPL"

module.exports =

# TODO document this class
class ReplTextEditor
  emitter: null

  # The captured real text editor
  textEditor: null

  # Boolean indicates if the underlying text editor should allow text to be modified
  # in any area of the REPL
  allowAnyChange: false

  # TODO document this
  delimiterRow: 0

  constructor: ()->
    @emitter = new Emitter
    # Opens the text editor that will represent the REPL.
    atom.workspace.open(TAB_TITLE, split:'right').done (textEditor) =>
      window.textEditor = textEditor
      @configureNewTextEditor(textEditor)

  onDidClose: (callback)->
    @emitter.on 'proto-repl-text-editor:close', callback

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

  # TODO docs
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

    # Display the help text when the repl opens.
    if atom.config.get("proto-repl.displayHelpText")
      @appendText(replHelpText)

  configureTextEditorClose: ()->
    @textEditor.onDidDestroy =>
      @emitter.emit 'proto-repl-text-editor:close'
      @textEditor = null

  # TODO comment
  allowsRangeChange: (range)->
    range.start.row > @delimiterRow && range.end.row > @delimiterRow

  # TODO comment
  allowsChange: (change)->
    @allowAnyChange || (@allowsRangeChange(change.newRange) && @allowsRangeChange(change.oldRange))

  # TODO document this
  configureBufferChanges: ()->
    @clear()

    # TODO do we have to have this function here?
    shouldAllowChange = (change)=> @allowsChange(change)

    # The text editor does not allow direct manipulation except below the delimiter
    # Replace buffer applyChange with our own that decides when the change
    # can be applied
    @textEditor.buffer.oldApplyChange = @textEditor.buffer.applyChange
    @textEditor.buffer.applyChange = (change, skipUndo) ->
      if shouldAllowChange(change)
        @oldApplyChange(change, skipUndo)

  # TODO docs
  configureHistorySupport: ->
    # Add history backward
    atTopOfEditArea = (editor)=>
      editor.getCursorBufferPosition().row-1 == @delimiterRow

    triggerHistoryBack = =>
      @emitter.emit "proto-repl-text-editor:history-back"

    @textEditor.oldMoveUp = @textEditor.moveUp
    @textEditor.moveUp = (lineCount)->
      console.log("Moving up")
      if atTopOfEditArea(this)
        console.log("Triggering history back")
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
      console.log("Moving down")
      if atBottomOfEditArea(this)
        console.log("Triggering history forward")
        triggerHistoryForward()
      else
        @oldMoveDown(lineCount)


  # TODO comment
  configureNewTextEditor: (textEditor)->
    @textEditor = textEditor
    @configureTextEditorBasics()
    @configureTextEditorClose()
    @configureBufferChanges()
    @configureHistorySupport()
    # TODO move this to REPL class. Consider commenting these kinds of things out.
    @appendText("Loading REPL...\n")

  autoscroll: ->
    if atom.config.get('proto-repl.autoScroll')
      @textEditor?.scrollToBottom()


  # TODO comment
  appendText: (text)->
    if @textEditor && text.length > 0

      # Append newline to text if it doesn't end with one.
      if text[text.length-1] != "\n"
        text = text + "\n"

      @modifyTextWith =>
        insertionPoint = new Point(@delimiterRow)
        insertRange = @textEditor.getBuffer().insert(insertionPoint, text)
        @delimiterRow = insertRange.end.row

      @autoscroll()

  attachListeners: ->
    @process.on 'proto-repl-process:data', (data) =>
      @appendText(data)

    # Called when the nREPL port is captured from the REPL output.
    # Setup the nREPL connection
    @process.on 'proto-repl-process:nrepl-port', (port) =>
      @conn = nrepl.connect({port: port, verbose: false})
      @conn.once 'connect', =>

        # Create a persistent session
        @conn.clone (err, messages)=>
          @session = messages[0]["new-session"]

        # Log any output from the nRepl connection messages
        @conn.messageStream.on "messageSequence", (id, messages)=>
          for msg in messages
            if msg.out or msg.err
              @appendText(msg.out or msg.err)

    @process.on 'proto-repl-process:exit', ()=>
      @textEditor = null
      @emitter.emit 'proto-repl-text-editor:exit'
      @appendText("\nREPL Closed\n")
