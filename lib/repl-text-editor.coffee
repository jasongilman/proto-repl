{Point, Emitter} = require 'atom'

# TODO handle the resizing of the text editor or consider making it smaller
EDIT_DELIMITER="--------------------\n"

TAB_TITLE = "Clojure REPL"

module.exports =

# TODO document this class
class ReplTextEditor
  emitter: null

  # The captured real text editor
  textEditor: null

  # Boolean indicates if the underlying text editor  should
  allowAnyChange: false

  delimiterRow: 0

  constructor: ->
    @emitter = new Emitter
    # Opens the text editor that will represent the REPL.
    atom.workspace.open(TAB_TITLE, split:'right').done (textEditor) =>
      @configureNewTextEditor(textEditor)

  onDidClose: (callback)->
    @emitter.on 'proto-repl-text-editor:close', callback

  clear: ->
    if @textEditor
      @allowAnyChange = true
      @textEditor.setText(EDIT_DELIMITER)
      # Set the delimiter row index so we can keep track of where the user can type.
      @delimiterRow = 0
      @allowAnyChange = false

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

  # TODO comment
  configureNewTextEditor: (textEditor)->
    @textEditor = textEditor
    @configureTextEditorBasics()
    @configureTextEditorClose()
    @configureBufferChanges()

    #TODO move these to their own functions.

    # TODO if they press enter at the bottom of the text editor we want to
    # 1. send the code to the repl
    # 2. clear the delimited area
    @textEditor.oldInsertText = @textEditor.insertText
    @textEditor.insertText = (text, options={}) ->
      console.log("Inserting text", text)
      @oldInsertText(text, options)

    # TODO if they press up or down cycle through history
    @textEditor.oldMoveUp = @textEditor.moveUp
    @textEditor.moveUp = (lineCount)->
      console.log("Moving up")
      @oldMoveUp(lineCount)


    @appendText(";; Loading REPL...\n")

  autoscroll: ->
    if atom.config.get('proto-repl.autoScroll')
      @textEditor?.scrollToBottom()

  # TODO comment
  allowsRangeChange: (range)->
    range.start.row > @delimiterRow && range.end.row > @delimiterRow

  # TODO comment
  allowsChange: (change)->
    @allowAnyChange || (@allowsRangeChange(change.newRange) && @allowsRangeChange(change.oldRange))

  # TODO comment
  appendText: (text)->
    if @textEditor && text.length > 0

      # Append newline to text if it doesn't end with one.
      if text[text.length-1] != "\n"
        text = text + "\n"

      insertionPoint = new Point(@delimiterRow)

      @allowAnyChange = true
      insertRange = @textEditor.getBuffer().insert(insertionPoint, text)
      @allowAnyChange = false

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
