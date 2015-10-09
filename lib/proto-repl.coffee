{CompositeDisposable, Range, Point} = require 'atom'
ReplTextEditor = require './repl-text-editor'
url = require 'url'

module.exports = ProtoRepl =
  config:
    displayHelpText:
      type: 'boolean'
      description: 'Enables the display of help text when the REPL starts.'
      default: true
    autoScroll:
      type: 'boolean'
      description: 'Sets whether or not the REPL scrolls when new content is written.'
      default: true
    leinPath:
      description: 'The path to the lein executable.'
      type: 'string'
      default: 'lein'
    leinArgs:
      description: 'The arguments to be passed to leiningen'
      type: 'string'
      default: "trampoline run -m clojure.main"

  subscriptions: null
  lastRepl: null
  toolbar: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace',
      'proto-repl:toggle': => @toggle()
      'proto-repl:clear-repl': => @clearRepl()
      'proto-repl:toggle-auto-scroll': => @toggleAutoScroll()
      'proto-repl:execute-selected-text': => @executeSelectedText()
      'proto-repl:execute-block': => @executeBlock()
      'proto-repl:load-current-file': => @loadCurrentFile()
      'proto-repl:refresh-namespaces': => @refreshNamespaces()
      'proto-repl:super-refresh-namespaces': => @superRefreshNamespaces()
      'proto-repl:exit-repl': => @quitRepl()
      'proto-repl:pretty-print': => @prettyPrint()
      'proto-repl:run-tests-in-namespace': => @runTestsInNamespace()
      'proto-repl:run-selected-test': => @runSelectedTest()
      'proto-repl:run-all-tests': => @runAllTests()
      'proto-repl:print-var-documentation': => @printVarDocumentation()
      'proto-repl:print-var-code': => @printVarCode()
      'proto-repl:list-ns-vars': => @listNsVars()
      'proto-repl:list-ns-vars-with-docs': => @listNsVarsWithDocs()
      'proto-repl:open-file-containing-var': => @openFileContainingVar()

  consumeToolbar: (toolbar) ->
    console.log("Toolbar consume")
    @toolbar = toolbar 'proto-repl'
    @toolbar.addButton
      icon: 'android-refresh'
      iconset: 'ion'
      callback: 'proto-repl:refresh-namespaces'
      tooltip: 'Refresh Namespaces'
    @toolbar.addButton
      icon: 'android-sync'
      iconset: 'ion'
      callback: 'proto-repl:super-refresh-namespaces'
      tooltip: 'Super Refresh Namespaces'
    @toolbar.addButton
      icon: 'speedometer'
      iconset: 'ion'
      callback: 'proto-repl:run-all-tests'
      tooltip: 'Run All Tests'

    @toolbar.addSpacer()

    @toolbar.addButton
      icon: 'paypal'
      iconset: 'fa'
      callback: 'proto-repl:pretty-print'
      tooltip: 'Pretty Print'

    @toolbar.addSpacer()

    @toolbar.addButton
      icon: 'code-download'
      iconset: 'ion'
      callback: 'proto-repl:toggle-auto-scroll'
      tooltip: 'Toggle Auto Scroll'
    @toolbar.addButton
      icon: 'trash-a'
      iconset: 'ion'
      callback: 'proto-repl:clear-repl'
      tooltip: 'Clear REPL'
    @toolbar.addSpacer()
    @toolbar.addButton
      icon: 'power'
      iconset: 'ion'
      callback: 'proto-repl:exit-repl'
      tooltip: 'Quit REPL'

  deactivate: ->
    @subscriptions.dispose()
    @toolbar?.removeItems()
    if @lastRepl
      @quitRepl()
      @lastRepl = null

  serialize: ->
    {}

  toggleAutoScroll: ->
    cfg = atom.config
    cfg.set('proto-repl.autoScroll', !(cfg.get('proto-repl.autoScroll')))

  toggle: ->
    # TODO we don't currently handle more than one repl. We just lose track of it.
    @lastRepl = new ReplTextEditor()

  clearRepl: ->
    @lastRepl.clear()

  executeCode: (code)->
    @lastRepl.sendToRepl(code)

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
    # An alternative that doesn't use text replacement. It has problems if the clojure code is not well formed
    # "(binding [*ns* (or (find-ns '#{ns}) (find-ns 'user))] (eval '(do #{text})))"

    escaped = text.replace(/\\/g,"\\\\").replace(/"/g, "\\\"")
    "(binding [*ns* (or (find-ns '#{ns}) (find-ns 'user))] (eval (read-string \"#{escaped}\")))"

  executeCodeInNs: (editor, code)->
    ns = @findNsDeclaration(editor)
    if ns
      code = @putTextInNamespace(code, ns)
    @executeCode(code)

  ############################################################
  # Code helpers

  getSelectedText: (editor)->
    text = editor.getSelectedText()
    if text == ""
      @executeCode("(println \"This command requires you to select some text.\")")
      null
    else
      text

  quitRepl: ->
    @executeCode("(System/exit 0)")

  prettyPrint: ->
    @executeCode("(pp)")

  refreshNamespacesCommand:
    "(let [r 'user/reset] (if (find-var r) ((resolve r)) (clojure.tools.namespace.repl/refresh :after r)))"

  refreshNamespaces: ->
    @executeCode(@refreshNamespacesCommand)

  superRefreshNamespaces: ->
    @executeCode("(clojure.tools.namespace.repl/clear) " + @refreshNamespacesCommand)

  loadCurrentFile: ->
    console.log("Loading current file")
    if editor = atom.workspace.getActiveTextEditor()
      console.log(editor.getPath())
      @executeCode("(load-file \"#{editor.getPath()}\")")

  runTestsInNamespace: ->
    if editor = atom.workspace.getActiveTextEditor()
      @executeCodeInNs("(run-tests)")

  runSelectedTest: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(do (test-vars [#'#{selected}]) (println \"tested #{selected}\"))"
        @executeCodeInNs(text)

  runAllTests: ->
    if editor = atom.workspace.getActiveTextEditor()
      @refreshNamespaces()
      @executeCode("(def all-tests-future (future (time (run-all-tests))))")

  printVarDocumentation: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        @executeCode("(clojure.repl/doc #{selected})")

  printVarCode: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        @executeCode("(clojure.repl/source #{selected})")

  # Lists all the vars in the selected namespace or namespace alias
  listNsVars: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(let [selected-symbol '#{selected}
                      selected-ns (get (ns-aliases *ns*) selected-symbol selected-symbol)]
                  (println \"\\nVars in\" (str selected-ns \":\"))
                  (println \"------------------------------\")
                  (doseq [s (clojure.repl/dir-fn selected-ns)]
                    (println s))
                  (println \"------------------------------\"))"
        @executeCode(text)

  # Lists all the vars with their documentation in the selected namespace or namespace alias
  listNsVarsWithDocs: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(let [selected-symbol '#{selected}
                      selected-ns (get (ns-aliases *ns*) selected-symbol selected-symbol)]
                  (println (str \"\\n\" selected-ns \":\"))
                  (println \"\" (:doc (meta (the-ns selected-ns))))
                  (doseq [s (clojure.repl/dir-fn selected-ns) :let [m (-> (str selected-ns \"/\" s) symbol find-var meta)]]
                    (println \"---------------------------\")
                    (println (:name m))
                    (cond
                      (:forms m) (doseq [f (:forms m)]
                                   (print \"  \")
                                   (prn f))
                      (:arglists m) (prn (:arglists m)))
                    (println \" \" (:doc m)))
                  (println \"------------------------------\"))"
        @executeCode(text)

  # Opens the file containing the currently selected var or namespace in the REPL. If the file is located
  # inside of a jar file it will decompress the jar file then open it. It will first check to see if a
  # jar file has already been decompressed once to avoid doing it multiple times for the same library.
  # Assumes that the Atom command line alias "atom" can be used to invoke Atom.
  openFileContainingVar: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(let [var-sym '#{selected}
                      the-var (or (some->> (find-ns var-sym)
                                           clojure.repl/dir-fn
                                           first
                                           name
                                           (str (name var-sym) \"/\")
                                           symbol)
                                  var-sym)
                      {:keys [file line]} (meta (eval `(var ~the-var)))
                      file-path (.getPath (.getResource (clojure.lang.RT/baseLoader) file))]
                  (if-let [[_
                            jar-path
                            partial-jar-path
                            within-file-path] (re-find #\"file:(.+/\\.m2/repository/(.+\\.jar))!/(.+)\" file-path)]
                    (let [decompressed-path (str (System/getProperty \"user.home\")
                                                 \"/.lein/tmp-sublime-jars/\"
                                                 partial-jar-path)
                          decompressed-file-path (str decompressed-path \"/\" within-file-path)
                          decompressed-path-dir (clojure.java.io/file decompressed-path)]
                      (when-not (.exists decompressed-path-dir)
                        (println \"decompressing\" jar-path \"to\" decompressed-path)
                        (.mkdirs decompressed-path-dir)
                        (clojure.java.shell/sh \"unzip\" jar-path \"-d\" decompressed-path))
                      (println \"Opening file\" decompressed-file-path \"to line\" line)
                      (clojure.java.shell/sh \"/usr/local/bin/atom\" (str decompressed-file-path \":\" line))
                      nil)
                    (do
                      (println \"Opening file\" file-path)
                      (clojure.java.shell/sh \"/usr/local/bin/atom\" (str file-path \":\" line))
                      nil)))"
        @executeCode(text)



  ############################################################


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

  executeSelectedText: ->
    if editor = atom.workspace.getActiveTextEditor()
      @executeCodeInNs(editor, editor.getSelectedText())

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
        @executeCodeInNs(editor, text)
