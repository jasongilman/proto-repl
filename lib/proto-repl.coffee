{CompositeDisposable, Range, Point} = require 'atom'
NReplConnectionView = require './views/nrepl-connection-view'
Repl = require './repl'
url = require 'url'
path = require 'path'
EditorUtils = require './editor-utils'

# This is built from the ClojureScript edn-reader project.
# Rebuild it with lein cljsbuild once.
require './edn-reader'

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
    useClojureSyntax:
      type: 'boolean'
      description: 'Sets whether or not the REPL should use Clojure syntax for highlighting. Disable this if having performance issues with REPL display.'
      default: true
    leinArgs:
      description: 'The arguments to be passed to leiningen. For advanced users only.'
      type: 'string'
      default: "repl :headless"
    showInlineResults:
      description: "Shows inline results of code execution. Install Atom Ink package to use this."
      type: 'boolean'
      default: true
    displayExecutedCodeInRepl:
      description: "Sets whether code sent to the REPL is displayed."
      type: 'boolean'
      default: true
    historySize:
      description: "The number of elements to keep in the history"
      type: "number"
      default: 50
    autoPrettyPrint:
      description: "Configures whether the REPL automatically pretty prints values."
      type: "boolean"
      default: false
    refreshOnReplStart:
      description: "Configures whether the REPL should automatically refresh code when it starts."
      type: "boolean"
      default: false

  subscriptions: null
  repl: null
  toolbar: null
  ink: null

  # A map of code execution extension names to callback functions.
  # See registerCodeExecutionExtension documentation for information on code execution extensions.
  # The same mutable map is shared with the REPL.
  codeExecutionExtensions: {}

  activate: (state) ->
    window.protoRepl = this
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace',
      'proto-repl:toggle': => @toggle()
      'proto-repl:toggle-current-project-clj': => @toggleCurrentEditorDir()
      'proto-repl:remote-nrepl-connection': => @remoteNReplConnection()
      'proto-repl:clear-repl': => @clearRepl()
      'proto-repl:toggle-auto-scroll': => @toggleAutoScroll()
      'proto-repl:execute-selected-text': => @executeSelectedText()
      'proto-repl:execute-block': => @executeBlock()
      'proto-repl:execute-top-block': => @executeBlock({topLevel: true})
      'proto-repl:execute-text-entered-in-repl': => @repl?.executeEnteredText()
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
      'proto-repl:interrupt': => @interrupt()
      'proto-repl:autoeval-file': => @autoEvalCurrent()
      'proto-repl:stop-autoeval-file': => @stopAutoEvalCurrent()

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
    if @repl
      @quitRepl()
      @repl = null

  serialize: ->
    {}

  toggleAutoScroll: ->
    cfg = atom.config
    cfg.set('proto-repl.autoScroll', !(cfg.get('proto-repl.autoScroll')))

  # Starts the REPL if it's not currently running.
  toggle: (projectPath=null)->
    if @repl == null
      @repl = new Repl(@codeExecutionExtensions)
      @prepareRepl(@repl)
      @repl.startProcessIfNotRunning(projectPath)
    else
      @repl.startProcessIfNotRunning(projectPath)

  prepareRepl: (repl)->
    repl.ink = @ink
    repl.onDidClose =>
      @repl = null
    repl.onDidStart =>
      if atom.config.get("proto-repl.refreshOnReplStart")
        @refreshNamespaces()

  # Starts the REPL in the directory of the file in the current editor.
  toggleCurrentEditorDir: ->
    if editor = atom.workspace.getActiveTextEditor()
      if editorPath = editor.getPath()
        @toggle(path.dirname(editorPath))

  # Opens nRepl connection dialog
  remoteNReplConnection: ->
    confirmCallback = ({port, host})=>
      unless @repl
        @repl = new Repl(@codeExecutionExtensions)
        @prepareRepl(@repl)
        @repl.onDidStart =>
          @appendText(";; Repl successfuly started")
      @repl.startRemoteReplConnection({port, host})

    @connectionView ?= new NReplConnectionView(confirmCallback)
    @connectionView.show()


  clearRepl: ->
    @repl?.clear()

  # Appends the specified text to the REPL
  appendText: (text)->
    @repl?.appendText(text)

  # Interrupts the currently executing command.
  interrupt: ()->
    @repl?.interrupt()

  quitRepl: ->
    @repl?.exit()

  ##############################################################################
  ## Ink Related

  consumeInk: (ink) ->
    @ink = ink
    if @repl
      @repl.ink = @ink
    @loading = new ink.Loading
    @spinner = new ink.Spinner @loading

  ##############################################################################
  ## Code Execution

  # Registers a code execution extension with the given name and callback function.
  #
  # Code execution extensions allow other Atom packages to extend Proto REPL
  # by taking output from the REPL and redirecting it for other uses like
  # visualization.
  # Code execution extensions are triggered when the result of code execution is
  # a vector with the first element is :proto-repl-code-execution-extension. The
  # second element in the vector should be the name of the extension to trigger.
  # The name will be used to locate the callback function. The third element in
  # the vector will be passed to the callback function.
  registerCodeExecutionExtension: (name, callback)->
    @codeExecutionExtensions[name] = callback

  # Executes the given code string in the REPL. See Repl.executeCode for supported
  # options.
  executeCode: (code, options={})->
    @repl?.executeCode(code, options)

  # Puts the given text in the namespace
  putTextInNamespace: (text, ns) ->
    "(binding [*ns* (or (find-ns '#{ns}) (find-ns 'user))] (eval (quote #{text})))"

  executeCodeInNs: (code, options={})->
    if editor = atom.workspace.getActiveTextEditor()
      ns = EditorUtils.findNsDeclaration(editor)
      if ns
        code = @putTextInNamespace(code, ns)
      @executeCode(code, options)

  # Executes the selected code.
  # Valid options:
  # * resultHandler - a callback function to invoke with the value that was read.
  #   If this is passed in then the value will not be displayed in the REPL.
  executeSelectedText: (options={})->
    if editor = atom.workspace.getActiveTextEditor()
      options.inlineOptions =
        editor: editor
        range: editor.getSelectedBufferRange()
      options.displayCode = editor.getSelectedText()
      # Selected code is executed in a do block so only a single value is returned.
      @executeCodeInNs("(do #{editor.getSelectedText()})", options)

  # Executes the block of code near the cursor.
  # Valid options:
  # * resultHandler - a callback function to invoke with the value that was read.
  #   If this is passed in then the value will not be displayed in the REPL.
  # * topLevel - Boolean to indicate if the top level block should be indicated.
  #   If this is false the the closest block will be executed. Defaults to false.
  executeBlock: (options={})->
    if editor = atom.workspace.getActiveTextEditor()
      if range = EditorUtils.getCursorInBlockRange(editor, options)
        text = editor.getTextInBufferRange(range).trim()
        options.displayCode = text

        # TODO we could do something with the result handler to unmark this area
        # when it completes.
        # Highlight the area that's being executed temporarily
        marker = editor.markBufferRange(range)
        decoration = editor.decorateMarker(marker,
            {type: 'highlight', class: "block-execution"})
        # Remove the highlight after a short period of time
        setTimeout(=>
          marker.destroy()
        , 350)

        options.inlineOptions =
          editor: editor
          range: range

        @executeCodeInNs(text, options)

  # A helper function for parsing some EDN data into JavaScript objects.
  parseEdn: (ednString)->
    edn_reader.core.parse(ednString)

  # Helper functions which takes an EDN string and pretty prints it. Returns the
  # string formatted data.
  prettyEdn: (ednString)->
    try
      edn_reader.core.pretty_print(ednString)
    catch error
      # Some responses from the REPL may be unparseable as in the case of var refs
      # like #'user/reset. We'll just return the original string in that case.
      return ednString

  # Parses the edn string and returns a displayable tree.  A tree is an array
  # whose first element is a string of the root of the tree. The rest of the
  # elements are branches off the root. Each branch is another tree. A leaf is
  # represented by a vector of one element.
  ednToDisplayTree: (ednString)->
    try
      edn_reader.core.to_display_tree(ednString)
    catch error
      # Some responses from the REPL may be unparseable as in the case of var refs
      # like #'user/reset. We'll just return the original string in that case.
      return [ednString]

  executeRanges: (editor, ranges)->
    if range = ranges.shift()
      code = editor.getTextInBufferRange(range)

      # Selected code is executed in a do block so only a single value is returned.
      @executeCodeInNs code,
        inlineOptions:
          editor: editor
          range: range
        resultHandler: (result, options)=>
          @repl.inlineResultHandler(result, options)
          # Recurse back in again to execute the next range
          @executeRanges(editor, ranges)

  # Turns on auto evaluation of the current file.
  autoEvalCurrent: ->
    if !atom.config.get('proto-repl.showInlineResults')
      @appendText("Auto Evaling is not supported unless inline results is enabled")
      return null

    if !@ink
      @appendText("Install Atom Ink package to use auto evaling.")
      return null

    if editor = atom.workspace.getActiveTextEditor()
      if editor.protoReplAutoEvalDisposable
        @appendText("Already auto evaling")
      else
        # Add a handler for when the editor stops changing
        editor.protoReplAutoEvalDisposable = editor.onDidStopChanging =>
          @ink?.Result.removeAll(editor)
          @executeRanges(editor, EditorUtils.getTopLevelRanges(editor))
        # Run it once the first time
        @executeRanges(editor, EditorUtils.getTopLevelRanges(editor))

  # Turns off autoevaling of the current file.
  stopAutoEvalCurrent: ->
    if editor = atom.workspace.getActiveTextEditor()
      if editor.protoReplAutoEvalDisposable
        editor.protoReplAutoEvalDisposable.dispose()
        editor.protoReplAutoEvalDisposable = null


  #############################################################################
  # Code helpers

  getSelectedText: (editor)->
    text = editor.getSelectedText()
    if text == ""
      @executeCode("(println \"This command requires you to select some text.\")")
      null
    else
      text

  prettyPrint: ->
    @executeCode("(do (require 'clojure.pprint) (clojure.pprint/pp))")

  refreshNamespacesCommand:
    "(let [r 'user/reset
          result (cond
                  (find-var r)
                  ((resolve r))

                  (find-ns 'clojure.tools.namespace.repl)
                  (eval `(clojure.tools.namespace.repl/refresh :after '~r))

                  :else
                  (println \"clojure.tools.namespace.repl not available. Add as a dependency and require in user.clj.\"))]
      (when (isa? (type result) Exception)
        (println (.getMessage result)))
      result)"

  refreshResultHandler: (callback, result)->
    # Value will contain an exception if it's not valid otherwise it will be nil
    # nil will also be returned if there is no clojure.tools.namespace available.
    # The callback will still be invoked in that case. That's important so that
    # run all tests will still work without it.
    if result.value == "nil"
      @appendText("Refresh complete")
      callback() if callback
    else if result.error
      @appendText("Refresh failed: " + result.error)

  # Refreshes any changed code in the project since the last refresh. Presumes
  # clojure.tools.namespace is a dependency and setup with standard user/reset
  # function. Will invoke the optional callback if refresh is successful.
  refreshNamespaces: (callback=null)->
    @appendText("Refreshing code...\n")
    @executeCode @refreshNamespacesCommand, resultHandler: (result)=>
      @refreshResultHandler(callback, result)


  # Refreshes all of the code in the project whether it has changed or not.
  # Presumes clojure.tools.namespace is a dependency and setup with standard
  # user/reset function. Will invoke the optional callback if refresh is
  # successful.
  superRefreshNamespaces: (callback=null)->
    @appendText("Clearing all and then refreshing code...\n")
    @executeCode "(do
                    (when (find-ns 'clojure.tools.namespace.repl)
                      (eval '(clojure.tools.namespace.repl/clear)))
                    #{@refreshNamespacesCommand})",
      resultHandler: (result)=> @refreshResultHandler(callback, result)

  loadCurrentFile: ->
    if editor = atom.workspace.getActiveTextEditor()
      # Escape file name
      fileName = editor.getPath().replace(/\\/g,"\\\\")
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
      @refreshNamespaces =>
        # Tests are only run if the refresh is successful.
        @executeCode("(def all-tests-future (future (time (clojure.test/run-all-tests))))")

  printVarDocumentation: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        # TODO we could also make it try to find the keyword around the cursor

        if @ink && atom.config.get('proto-repl.showInlineResults')
          range = editor.getSelectedBufferRange()
          range.end.column = Infinity
          inlineHandler = @repl.makeInlineHandler(editor, range, (value)=>
            # Strip off the "----" at the beginning
            [selected, [@parseEdn(value).substr(26)]])
          @executeCodeInNs "(do
                              (require 'clojure.repl)
                              (with-out-str (clojure.repl/doc #{selected})))",
                          resultHandler: inlineHandler
        else
          @executeCodeInNs "(do
                              (require 'clojure.repl)
                              (clojure.repl/doc #{selected}))"

  printVarCode: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        @executeCodeInNs("(do (require 'clojure.repl) (clojure.repl/source #{selected}))")

  # Lists all the vars in the selected namespace or namespace alias
  listNsVars: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(do
                  (require 'clojure.repl)
                  (let [selected-symbol '#{selected}
                        selected-ns (get (ns-aliases *ns*) selected-symbol selected-symbol)]
                    (println \"\\nVars in\" (str selected-ns \":\"))
                    (println \"------------------------------\")
                    (doseq [s (clojure.repl/dir-fn selected-ns)]
                      (println s))
                    (println \"------------------------------\")))"
        @executeCodeInNs(text)

  # Lists all the vars with their documentation in the selected namespace or namespace alias
  listNsVarsWithDocs: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(do
                  (require 'clojure.repl)
                  (let [selected-symbol '#{selected}
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
                    (println \"------------------------------\")))"

        @executeCodeInNs(text)

  # Opens the file containing the currently selected var or namespace in the REPL. If the file is located
  # inside of a jar file it will decompress the jar file then open it. It will first check to see if a
  # jar file has already been decompressed once to avoid doing it multiple times for the same library.
  # Assumes that the Atom command line alias "atom" can be used to invoke Atom.
  openFileContainingVar: ->
    if editor = atom.workspace.getActiveTextEditor()
      if selected = @getSelectedText(editor)
        text = "(do (require 'clojure.repl)
                    (require 'clojure.java.shell)
                    (require 'clojure.java.io)
                    (let [var-sym '#{selected}
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
                          nil))))"
        @executeCodeInNs(text)
