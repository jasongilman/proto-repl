{Task} = require 'atom'
LeinRunner = require.resolve './lein-runner'
BootRunner = require.resolve './boot-runner'
path = require 'path'
fs = require('fs')
NReplConnection = require './nrepl-connection'

# The code to send to the repl to exit.
EXIT_CMD="(System/exit 0)"

# The path to a default project to use if proto repl is started outside of a leiningen or boot project
DEFAULT_PROJECT_PATH = "#{atom.packages.getPackageDirPaths()[0]}/proto-repl/proto-no-proj"

module.exports=
# Represents a locally running REPL process.
class LocalReplProcess

  # A function that can be used to write back messages to the REPL.
  appendText: null

  # The nREPL connection
  conn: new NReplConnection()

  # reference to a running process
  process: null

  constructor: (@appendText)->
    null

  getType: ->
    "Local"

  # Searches upwords to find the root project if proto repl was opened in a
  # subdirectory of the project.
  getRootProject: (currentPath, limit=0) ->
    # Avoid errors if the Atom config directory is open. We can't treat this like
    # a normal directory.
    if currentPath.startsWith("atom://")
      return

    # Try to find the root of the current project by searching
    # for one of the configuration files
    # build.boot (Boot) or
    # project.clj (Leiningen)
    parentDirectory = path.resolve(currentPath, "..")

    if currentPath != parentDirectory and limit < 100
      matches = fs.readdirSync(currentPath).filter (f) ->
        f == "project.clj" or f == "build.boot"

      if currentPath and matches.length == 0
        @getRootProject(parentDirectory, limit + 1)
      else
        currentPath unless matches.length == 0

  start: (projectPath, connOptions)->
    if @running()
      return

    # Default project path to the current directory. This can still set the
    # projectPath to null if no file is opened in atom.
    unless projectPath?
      projectPath = atom.project.getPaths()[0]

    # Search for a project.clj or build.boot file.
    # The if must be used in case of no directory open in Atom.
    projectPath = @getRootProject(projectPath) if projectPath

    bootFound = fs.existsSync(projectPath + "/build.boot")
    leinFound = fs.existsSync(projectPath + "/project.clj")
    # If we're not in a project or there isn't a
    # project file use the default leiningen project
    if (projectPath?)
      if bootFound && leinFound
        if atom.config.get("proto-repl.preferLein")
          replType = "lein"
        else
          replType = "boot"
      else if bootFound
        replType = "boot"
      else if leinFound
        replType = "lein"
      else
        replType = "lein"
        projectPath = DEFAULT_PROJECT_PATH
    else
      replType = "lein"
      projectPath = DEFAULT_PROJECT_PATH

    @appendText("Starting REPL with #{replType} in #{projectPath}\n", true)

    # Start the repl process as a background task
    switch replType
      when "boot"
        @process = Task.once BootRunner,
                             path.resolve(projectPath),
                             atom.config.get('proto-repl.bootPath').replace("/boot",""),
                             atom.config.get('proto-repl.bootArgs').split(" ")
      # when "lein" then
      else
        @process = Task.once LeinRunner,
                             path.resolve(projectPath),
                             atom.config.get('proto-repl.leinPath').replace("/lein",""),
                             atom.config.get('proto-repl.leinArgs').split(" ")


    # The process sends stdout
    @process.on 'proto-repl-process:data', (data) =>
      @appendText(data)

    # The nREPL port was captured from output
    @process.on 'proto-repl-process:nrepl-port', (port) =>
      connOptions.port = port
      @conn.start(connOptions)

    # The process exited.
    @process.on 'proto-repl-process:exit', ()=>
      @appendText("\nREPL Closed\n")
      # The REPL Text editor may or may not be still open at this point.
      # We track that separately.
      @process = null
      @conn.close()

  running: ()->
    @process != null && @conn.connected()

  sendCommand: (code, options, resultHandler)->
    @conn.sendCommand(code, options, resultHandler)

  getCurrentNs: ->
    @conn.getCurrentNs()

  interrupt: ->
    @conn.interrupt()
    @appendText("Interrupting")

  # Stops the running process
  stop: ()->
    try
      # Tell the process to shutdown
      @conn.sendCommand EXIT_CMD,true, => return
      @conn.close()
    catch error
      console.log("Error trying to send exit command to REPL.", error)
    # Kill the process to make sure.
    @process?.send event: 'kill'
    @process = null
