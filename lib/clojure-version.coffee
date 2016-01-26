module.exports=

class ClojureVersion
  major: null
  minor: null
  incremental: null
  qualifier: null

  constructor: (versionMap)->
    @major = Number.parseInt(versionMap.major)
    @minor = Number.parseInt(versionMap.minor)
    @incremental = Number.parseInt(versionMap.incremental)
    @qualifier = versionMap.qualifier

  # Returns true if this is a supported version of Clojure for Proto REPL.
  isSupportedVersion: ->
    @major == 1 && @minor >= 6

  # Returns true if reader conditionals are supported. (>= 1.7)
  isReaderConditionalSupported: ->
    @minor >= 7
