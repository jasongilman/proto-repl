# Implements an Autocomplete Provider for Clojure that uses compliment
# (https://github.com/alexander-yakushev/compliment)

{Range, Point} = require 'atom'
EditorUtils = require './editor-utils'
self_hosted_clj = require './proto_repl/proto_repl/self_hosted.js'

# Converts a completion result into a suggestion for Autocomplete
completionToSuggestion = (prefix, {candidate, docs, type})->
  text: candidate
  type: type
  description: docs
  replacementPrefix: prefix

# Returns the top level code around the given buffer position
# with the cursor position replaced with __prefix__ as described by
# https://github.com/alexander-yakushev/compliment/wiki/Context
bufferPositionContext = (editor, pos, prefix)->
  ranges = EditorUtils.getTopLevelRanges(editor)
  range = ranges.find (range) -> range.containsPoint(pos)
  if range
    # Cut off the beginning of the top range so that it doesn't include the prefix
    beginningEnd = new Point(pos.row, pos.column - prefix.length)
    beginning = editor.getTextInBufferRange(new Range(range.start, beginningEnd))
    ending = editor.getTextInBufferRange(new Range(pos, range.end))
    beginning + "__prefix__" + ending
  else
    "nil"

# Returns the code to find the completion for the given prefix.
completionsCode = (editor, bufferPosition, prefix)->
  context = bufferPositionContext(editor, bufferPosition, prefix)
  ns = EditorUtils.findNsDeclaration(editor) || "nil"
  escapedStr = EditorUtils.escapeClojureCodeInString(context)
  "(do
     (require 'compliment.core)
     (let [completions (compliment.core/completions
                        \"#{prefix}\"
                        {:tag-candidates true
                         :ns '#{ns}
                         :context #{escapedStr}})]
       (->> completions
            (take 50)
            (mapv #(assoc % :docs (compliment.core/documentation
                                    (:candidate %) '#{ns}))))))"

# We ignore the prefix used by autocomplete because it doesn't respect real clojure
# identifiers. Based on https://github.com/atom/autocomplete-plus/wiki/Provider-API#generating-a-new-prefix
getPrefix = (editor, bufferPosition) ->
  # Whatever your prefix regex might be
  regex = /[A-Za-z0-9_\-></.?!*:]+$/

  # Get the text for the line up to the triggered buffer position
  line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition])

  # Match the regex to the line, and return the match
  line.match(regex)?[0] or ''

module.exports =
  scopeSelector: '.source.clojure'
  textEditorSelectors: 'atom-text-editor'
  disableForScopeSelector: '.source.clojure .comment, .source.clojure .string'
  inclusionPriority: 100
  excludeLowerPriority: false

  getTextEditorSelector: -> 'atom-text-editor'

  getSuggestions: ({editor, bufferPosition, scopeDescriptor}) ->
    prefix = getPrefix(editor, bufferPosition)

    if prefix != ""
      new Promise (resolve) ->
        if !protoRepl.running()
          # if we're not running resolve this so other suggestors can be triggered
          resolve []
        else if protoRepl.isSelfHosted()
          self_hosted_clj.completions prefix, (matches)->
            suggestions = (completionToSuggestion(prefix, c) for c in matches)
            resolve suggestions
        else
          code = completionsCode(editor, bufferPosition, prefix)
          protoRepl.executeCode code,
            displayInRepl: false
            resultHandler: (result)->
              if result.error
                console.log result.error
              else
                completions = protoRepl.parseEdn(result.value)
                suggestions = (completionToSuggestion(prefix, c) for c in completions)
                resolve suggestions
