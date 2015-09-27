{CompositeDisposable, Range, Point} = require 'atom'
ReplScrollView = require './repl-scroll-view'
ReplTextEditor = require './repl-text-editor'
url = require 'url'

module.exports = ProtoRepl =
  subscriptions: null
  lastRepl: null

  activate: (state) ->
    # markdown preview way
    # atom.workspace.addOpener (uriToOpen) =>
    #   console.log("Opening:" + uriToOpen)
    #   try
    #     {protocol} = url.parse(uriToOpen)
    #   catch error
    #     return
    #   console.log("Protocol:" + protocol)

    #   return unless protocol is 'repl-scroll-view:'
    #   console.log("returning a new repl scroll view")
    #   @lastRepl = new ReplScrollView()
    #   # TODO temporary for debugging
    #   global.lastRepl = @lastRepl
    #   @lastRepl

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'proto-repl:toggle': => @toggle()
    @subscriptions.add atom.commands.add 'atom-workspace',
      'proto-repl:execute-selected-text': => @executeSelectedText()
    @subscriptions.add atom.commands.add 'atom-workspace',
      'proto-repl:execute-block': => @executeBlock()

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->
    {}

  toggle: ->
    console.log 'ProtoRepl was toggled!'
    
    # markdown preview way
    # atom.workspace.open("repl-scroll-view://nothing")

    # Using text editor directly way
    @lastRepl = new ReplTextEditor()

  # TODO extract out these functions into a helper set of functions.
  # Make all things arguments to this function. (ie. editor)

  findNsDeclaration: (editor)->
    nsName = null
    editor.scan /\(ns ([^\s\)]+)/, ({match, stop})->
      nsName = match[1]
      stop()
    nsName

  # Puts the given text in the namespace
  putTextInNamespace: (text, ns) ->
    # TODO test this approach thoroughly. 
    
    ## load string method
    # text = text.replace(/\\\\/g,"\\\\\\\\").replace(/"/g,"\\\"").replace(/\n/g,"\\n")
    # text = "(load-string \"#{text}\")"
    
    ## eval method
    text = "(eval '(do #{text}))"

    "(binding [*ns* (or (find-ns '#{ns}) (find-ns 'user))] #{text})"

  findBlockStartPosition:  (editor, fromPos) ->
    braceClosed = 
      "}": 0
      ")": 0
      "]": 0
    openToClose = 
      "{": "}"
      "[": "]"
      "(": ")"
    startPos = null
    editor.backwardsScanInBufferRange /[\{\}\[\]\(\)]/g, new Range([0,0], fromPos), (result) ->
      startPos = result.range.start
      c = ""+result.match[0]
      if braceClosed[c] != undefined
        braceClosed[c]++
      else 
        braceClosed[openToClose[c]]--
        if braceClosed[openToClose[c]] == -1
          result.stop()
    startPos

  findBlockEndPosition:  (editor, fromPos) ->
    braceOpened = 
      "{": 0
      "(": 0
      "[": 0
    closeToOpen = 
      "}": "{"
      "]": "["
      ")": "("
    endPos = null
    scanRange = new Range(fromPos, editor.buffer.getEndPosition())
    editor.scanInBufferRange /[\{\}\[\]\(\)]/g, scanRange, (result) ->
      endPos = result.range.start
      c = ""+result.match[0]
      if braceOpened[c] != undefined
        braceOpened[c]++
      else 
        braceOpened[closeToOpen[c]]--
        if braceOpened[closeToOpen[c]] == -1
          result.stop()
    endPos

  executeCode: (editor, code)->
    ns = @findNsDeclaration(editor)
    if ns 
      code = @putTextInNamespace(code, ns)
    @lastRepl.sendToRepl(code)

  executeSelectedText: ->
    if editor = atom.workspace.getActiveTextEditor()
      @executeCode(editor, editor.getSelectedText())

  executeBlock: ->
    if editor = atom.workspace.getActiveTextEditor()
      pos = editor.getCursorBufferPosition()
      startPos = @findBlockStartPosition(editor, pos)
      endPos = @findBlockEndPosition(editor, pos)

      if startPos && endPos
        closingPos = endPos.translate(new Point(0, 1))

        # Note that this will if used instead of executing the code implement expand selection on 
        # repeated executions
        #editor.setSelectedBufferRange(new Range(startPos, closingPos))

        text = editor.getTextInBufferRange(new Range(startPos, closingPos))
        @executeCode(editor, text)





