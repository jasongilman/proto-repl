{Task, Emitter} = require 'atom'
path = require 'path'
fs = require('fs')
ReplProcess = require.resolve './repl-process'
ReplTextEditor = require './repl-text-editor'
nrepl = require('nrepl-client')

replHelpText = "TODO new descriptive text"

# The path to a default project to use if proto repl is started outside of a leiningen project
defaultProjectPath = "#{atom.packages.getPackageDirPaths()[0]}/proto-repl/proto-no-proj"

# The code to send to the repl to exit.
EXIT_CMD="(System/exit 0)"

module.exports =
class Repl
  emitter: null
  replTextEditor: null

  # A map of code execution extension names to callback functions.
  codeExecutionExtensions: null

  constructor: (@codeExecutionExtensions)->
    @emitter = new Emitter
    projectPath = atom.project.getPaths()[0]

    # If we're not in a project or there isn't a leiningen project file use
    # the default project
    if !(projectPath?) || !fs.existsSync(projectPath + "/project.clj")
      projectPath = defaultProjectPath

    @replTextEditor = new ReplTextEditor()

    # Start the repl process as a background task
    @process = Task.once ReplProcess,
                         path.resolve(projectPath),
                         atom.config.get('proto-repl.leinPath').replace("/lein",""),
                         atom.config.get('proto-repl.leinArgs').split(" ")

    @attachListeners()


  # TODO comment
  appendText: (text)->
    @replTextEditor?.appendText(text)

  attachListeners: ->
    @replTextEditor.onDidClose =>
      try
        # I couldn't refer to sendToRepl directly here. I'm not sure why.
        @conn?.eval(EXIT_CMD)
        @conn = null
        @process.send event: 'kill'
        @replTextEditor = null
        @emitter.emit 'proto-repl-repl:exit'
      catch error
        console.log("Warning error while closing: " + error)

    @process.on 'proto-repl-process:data', (data) =>
      @appendText(data)

    # Called when the nREPL port is captured from the REPL output.
    # Setup the nREPL connection
    @process.on 'proto-repl-process:nrepl-port', (port) =>
      @conn = nrepl.connect({port: port, verbose: false})
      @conn.once 'connect', =>

        # Create a persistent session
        @conn.clone (err, messages)=>
          @session = messages[0]["new-session"]

        # Log any output from the nRepl connection messages
        @conn.messageStream.on "messageSequence", (id, messages)=>
          for msg in messages
            if msg.out or msg.err
              @appendText(msg.out or msg.err)

    @process.on 'proto-repl-process:exit', ()=>
      @appendText("\nREPL Closed\n")
      @emitter.emit 'proto-repl-repl:exit'
      @replTextEditor = null

  onDidExit: (callback)->
    @emitter.on 'proto-repl-repl:exit', callback

  sendToRepl: (text, resultHandler)->
    @conn?.eval text, "user", @session, (err, messages)=>
      for msg in messages
        if msg.value
          resultHandler(msg.value)

  # Executes the given code string.
  # Valid options:
  # * resultHandler - a callback function to invoke with the value that was read.
  #   If this is passed in then the value will not be displayed in the REPL.
  executeCode: (code, options={})->
    resultHandler = options?.resultHandler
    normalHandler = (value)=>
      if resultHandler
        resultHandler(value)
      else
        @appendText("=> " + value)

        # Alpha support of inline results using Atom Ink.
        if @ink && options.inlineOptions && atom.config.get('proto-repl.showInlineResults')
          io = options.inlineOptions
          view = @ink.tree.fromJson([value])[0]
          r = @ink.results.showForRange io.editor, io.range,
            content: view
            plainresult: value

    if options.displayCode && atom.config.get('proto-repl.displayExecutedCodeInRepl')
      @appendText(options.displayCode)

    @sendToRepl code, (value)=>
      # check if it's an extension response
      if value.match(/\[\s*:proto-repl-code-execution-extension/)
        parsed = @parseEdn(value)
        extensionName = parsed[1]
        data = parsed[2]
        extensionCallback = @codeExecutionExtensions[extensionName]
        if extensionCallback
          extensionCallback(data)
        else
          normalHandler(value)
      else
        normalHandler(value)

  # Executes the text that was entered in the entry area
  executeEnteredText: ->
    if editor = atom.workspace.getActiveTextEditor()
      if editor == @replTextEditor.textEditor
        code = @replTextEditor.enteredText()
        @replTextEditor.clearEnteredText()
        @executeCode(code, displayCode: code)

  exit: ->
    @sendToRepl(EXIT_CMD)
    @conn = null
    @appendText("\nREPL Closed\n")

  interrupt: ->
    @conn?.interrupt @session, (err, result)=>
      @appendText("interrupted")

  clear: ->
    @replTextEditor?.clear()
