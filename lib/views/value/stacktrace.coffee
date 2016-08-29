{$, $$} = require 'atom-space-pen-views'

module.exports =
  # DOM related functions
  # render an html/jquery object for a stacktrace frame
  # The hyperlink allows frames to link to other files
  # args: text to the left of the hyperlink, hyperlink content and,
  #       text to the right of the hyperlink
  frame: (startText, hyperlink, endText) ->
    view = $$ ->
      @div =>
        @span startText
        @a href: '#', style: 'color: #ED4337; fontStyle: italic',
          hyperlink # NOTE: add a class
        @span endText
    return view

  # render an html/jquery object for a stacktrace summary
  # a simple div tag with pre formated text.
  summary: (text) ->
    view = $$ ->
      @div style: 'white-space:pre;', text
    return view

  # logic related functions

  ## DUMMY functions !! do not use yet !!
  isSupported: (rawText) ->
    return true # dummy

  frameParser: (rawText) ->
    # repl/pst
    return /(\S+?)\/([^\s\/]+).*?\.clj:(\d+)/

  isEvalFn: (fn) ->
    evalRegex = /eval\d+/
    return evalRegex.exec(fn) is null
