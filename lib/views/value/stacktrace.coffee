# stacktrace postprocesing functionality
# defines several regexes to process stacktraces' frames as well as html/js
# functions to display them

{$, $$} = require 'atom-space-pen-views'
# regex to check if a function name is like eval
evalFnRegex = /eval\d+/
# clojure.repl/pst related regexes
replPstRegex = /(\S+?)\/([^\s\/]+).*?\.clj:(\d+)/
replPstSplitter = /(.*?)(\(\S+:\d+\))()/

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


  # logic related functions -----------------------------------

  # scan the stacktrace raw text and return 2 parsers
  # ContentRegex is able to extract namespace, function and line number info
  # from a stackframe. HyperlinkRegex is able to split a stackframe into
  # the text to the left of the hyperlink, the hyperlink content and the text
  # to the right of the hyperlink
  getParser: (rawText) ->
    lines = rawText.split('\n')
    if lines.some((text) -> replPstRegex.exec(text))
      return ContentRegex: replPstRegex, HyperlinkRegex: replPstSplitter
    else
      # TODO: add more stacktrace parsers
      return null

  # split a stacktrace into its summary and its content.
  # the summary will be displayed when the stacktrace is collapsed and its
  # content when it is expanded
  splitContent: (parser, rawText) ->
    if parser.ContentRegex is replPstRegex
      lines = rawText.split('\n')
      return [lines[0], lines.slice(1)]
    else
      return null # TODO: add more stacktrace parsers

  # use a parser to extract a line ns, fn and lineno
  # returns null if the line should be ignored
  parseLine: (parser, line) ->
    frame = parser.ContentRegex.exec(line)
    # not a stacktrace frame
    if frame is null
      return null

    [_, ns, fn, lineno] = frame
    # ignore clojure internal calls
    if ns.startsWith('clojure') or evalFnRegex.exec(fn) isnt null
      return null

    return [ns, fn, lineno]

  # divide a line into its left, right and hyperlink text
  divideLine: (parser, line) ->
    [match, textLeft, hyperlink, textRight] = parser.HyperlinkRegex.exec(line)
    return [textLeft, hyperlink, textRight]
