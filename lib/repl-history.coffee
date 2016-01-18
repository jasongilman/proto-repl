module.exports =
  class ReplHistory
    # An array containing history. It's a static size.
    history: null

    # Index into the current history being displayed
    historyIndex: null

    # The index of the position currently being edited.
    # Displayed history index can not go forward past this or before it.
    currentPosition: null

    constructor: ->
      @history = [""]
      @currentPosition = 0
      @historyIndex = 0

    size: ->
      @history.length

    currentText: ->
      if text = @history[@currentPosition]
        text
      else
        ""

    setCurrentText: (text)->
      @history[@currentPosition] = text

    # Increments the current position and sets the text to empty.
    newEntry: ->
      @currentPosition += 1
      if @currentPosition >= atom.config.get("proto-repl:historySize")
        @currentPosition -= 1
        @history.shift()

      @history.push("")
      # Reset history index to the new position
      @historyIndex = @currentPosition

    back: (currentText)->
      @history[@historyIndex] = currentText

      if @historyIndex > 0
        @historyIndex -= 1
      @history[@historyIndex]

    forward: (currentText)->
      @history[@historyIndex] = currentText

      if @historyIndex < @size()-1
        @historyIndex +=1
      @history[@historyIndex]
