{CompositeDisposable, Range, Point} = require 'atom'

module.exports = EditorUtils =

  # Finds a Clojure Namespace declaration in the editor and returns the name
  # of the namespace.
  findNsDeclaration: (editor)->
    nsName = null
    editor.scan /\(ns ([^\s\)]+)/, ({match, stop})->
      nsName = match[1]
      stop()
    nsName

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

  # Determines if the cursor is directly after a closed block. If it is returns
  # the text of that block
  directlyAfterBlockRange: (editor)->
    pos = editor.getCursorBufferPosition()
    if pos.column > 0
      previousPos = new Point(pos.row, pos.column-1)
      previousChar = editor.getTextInBufferRange(new Range(previousPos, pos))
      if [")","}","]"].indexOf(previousChar) >= 0
        if startPos = @findBlockStartPosition(editor, previousPos)
          new Range(startPos, pos)

  # Determines if the cursor is directly before a block opening. If it is returns
  # the text of that block
  directlyBeforeBlockRange: (editor)->
    pos = editor.getCursorBufferPosition()
    subsequentPos = pos.translate(new Point(0, 1))
    afterChar = editor.getTextInBufferRange(new Range(pos, subsequentPos))
    if ["(","{","["].indexOf(afterChar) >= 0
      if endPos = @findBlockEndPosition(editor, subsequentPos)
        closingPos = endPos.translate(new Point(0, 1))
        new Range(pos, closingPos)

  # If the cursor is located in a Clojure block (in parentheses, brackets, or
  # braces) or next to one returns the text of that block.
  getCursorInBlockRange: (editor)->
    if range = @directlyAfterBlockRange(editor)
      range
    else if range = @directlyBeforeBlockRange(editor)
      range
    else
      pos = editor.getCursorBufferPosition()
      startPos = @findBlockStartPosition(editor, pos)
      endPos = @findBlockEndPosition(editor, pos)

      if startPos && endPos
        closingPos = endPos.translate(new Point(0, 1))

        # Note that this will if used instead of executing the code implement expand selection on
        # repeated executions
        #editor.setSelectedBufferRange(new Range(startPos, closingPos))

        new Range(startPos, closingPos)
