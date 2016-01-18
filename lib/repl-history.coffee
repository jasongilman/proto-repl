module.exports =
  class ReplHistory
    # An array containing history. It's a static size.
    history: null

    # The index of the position currently being edited.
    currentPosition: null

    constructor: ->
      @history = [""]
      @currentPosition = 0

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
    setLastTextAndAddNewEntry: (text)->
      @history[@size()-1] = text
      if @size() >= atom.config.get("proto-repl:historySize")
        @history.shift()

      @history.push("")
      @currentPosition = @size()-1

    back: ()->
      if @currentPosition > 0
        @currentPosition -= 1
      @history[@currentPosition]

    forward: ()->
      if @currentPosition < @size()-1
        @currentPosition +=1
      @history[@currentPosition]
