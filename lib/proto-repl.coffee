{CompositeDisposable, Range, Point} = require 'atom'
ReplTextEditor = require './repl-text-editor'
url = require 'url'
EditorUtils = require './editor-utils'

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
  replTextEditor: null
  toolbar: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace',
      'proto-repl:toggle': => @toggle()
      'proto-repl:clear-repl': => @clearRepl()
      'proto-repl:toggle-auto-scroll': => @toggleAutoScroll()
      'proto-repl:execute-selected-text': => @executeSelectedText()
      'proto-repl:execute-block': => @executeBlock()
      'proto-repl:execute-top-block': => @executeBlock({topLevel: true})
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
      tooltip: 'Clear and Refresh Namespaces'
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
    if @replTextEditor
      @quitRepl()
      @replTextEditor = null

  serialize: ->
    {}

  toggleAutoScroll: ->
    cfg = atom.config
    cfg.set('proto-repl.autoScroll', !(cfg.get('proto-repl.autoScroll')))

  toggle: ->
    window.protoRepl = this
    if @replTextEditor == null
      @replTextEditor = new ReplTextEditor()
      @replTextEditor.onDidExit =>
        @replTextEditor = null

  clearRepl: ->
    @replTextEditor?.clear()

  executeCode: (code)->
    @replTextEditor?.sendToRepl(code)

  # Puts the given text in the namespace
  putTextInNamespace: (text, ns) ->
    # An alternative that doesn't use text replacement. It has problems if the clojure code is not well formed
    # "(binding [*ns* (or (find-ns '#{ns}) (find-ns 'user))] (eval '(do #{text})))"

    escaped = text.replace(/\\/g,"\\\\").replace(/"/g, "\\\"")
    "(binding [*ns* (or (find-ns '#{ns}) (find-ns 'user))] (eval (read-string \"#{escaped}\")))"

  executeCodeInNs: (code)->
    if editor = atom.workspace.getActiveTextEditor()
      ns = EditorUtils.findNsDeclaration(editor)
      if ns
        code = @putTextInNamespace(code, ns)
      @executeCode(code)

  executeSelectedText: ->
    if editor = atom.workspace.getActiveTextEditor()
      @executeCodeInNs(editor.getSelectedText())

  executeBlock: (options)->
    if editor = atom.workspace.getActiveTextEditor()
      if range = EditorUtils.getCursorInBlockRange(editor, options)
        text = editor.getTextInBufferRange(range).trim()

        # Highlight the area that's being executed temporarily
        marker = editor.markBufferRange(range)
        decoration = editor.decorateMarker(marker,
            {type: 'highlight', class: "block-execution"})
        # Remove the highlight after a short period of time
        setTimeout(=>
          marker.destroy()
        , 350)

        @executeCodeInNs(text)

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
    @executeCode("(clojure.pprint/pp)")

  refreshNamespacesCommand:
    "(let [r 'user/reset] (if (find-var r) ((resolve r)) (clojure.tools.namespace.repl/refresh :after r)))"

  refreshNamespaces: ->
    @executeCode(@refreshNamespacesCommand)

  superRefreshNamespaces: ->
    @executeCode("(clojure.tools.namespace.repl/clear) " + @refreshNamespacesCommand)

  loadCurrentFile: ->
    if editor = atom.workspace.getActiveTextEditor()
      fileName = editor.getPath()
      @executeCode("(do (println \"Loading File #{fileName}\") (load-file \"#{fileName}\"))")

  runTestsInNamespace: ->
    if editor = atom.workspace.getActiveTextEditor()
      @executeCodeInNs("(clojure.test/run-tests)")

  runSelectedTest: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(do (clojure.test/test-vars [#'#{selected}]) (println \"tested #{selected}\"))"
        @executeCodeInNs(text)

  runAllTests: ->
    if editor = atom.workspace.getActiveTextEditor()
      @refreshNamespaces()
      @executeCode("(def all-tests-future (future (time (clojure.test/run-all-tests))))")

  printVarDocumentation: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        @executeCodeInNs("(clojure.repl/doc #{selected})")

  printVarCode: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        @executeCodeInNs("(clojure.repl/source #{selected})")

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
        @executeCodeInNs(text)

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
        @executeCodeInNs(text)

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
                                                 \"/.lein/tmp-atom-jars/\"
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
        @executeCodeInNs(text)
