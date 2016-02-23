{Task} = require 'atom'
LeinRunner = require.resolve './lein-runner'
path = require 'path'
fs = require('fs')

# The code to send to the repl to exit.
EXIT_CMD="(System/exit 0)"

# The path to a default project to use if proto repl is started outside of a leiningen project
DEFAULT_PROJECT_PATH = "#{atom.packages.getPackageDirPaths()[0]}/proto-repl/proto-no-proj"

module.exports=
# Represents a locally running REPL process.
class LocalReplProcess

  # A function that can be used to write back messages to the REPL.
  appendText: null

  # The nREPL connection
  conn: null

  # reference to a running process
  process: null

  constructor: (@appendText, @createConn)->
    null

  # Searches upwords to find the root project if proto repl was opened in a
  # subdirectory of the project.
  getRootProject: (currentPath, limit=0) ->
    # Try to find the root of the current project by searching for project.clj
    parentDirectory = path.resolve(currentPath, "..")

    if currentPath != parentDirectory and limit < 100
      matches = fs.readdirSync(currentPath).filter (f) ->
        f == "project.clj"

      if currentPath and matches.length == 0
        @getRootProject(parentDirectory, limit + 1)
      else
        currentPath unless matches.length == 0

  start: (projectPath)->
    if @running()
      return

    # Default project path to the current directory. This can still set the
    # projectPath to null if no file is opened in atom.
    unless projectPath?
      projectPath = atom.project.getPaths()[0]

    # Search for a project.clj file.
    # The if must be used in case of no directory open in Atom.
    projectPath = @getRootProject(projectPath) if projectPath

    # If we're not in a project or there isn't a leiningen project file use
    # the default project
    if !(projectPath?) || !fs.existsSync(projectPath + "/project.clj")
      projectPath = DEFAULT_PROJECT_PATH

    @appendText("Starting REPL in #{projectPath}\n", true)

    # Start the repl process as a background task
    @process = Task.once LeinRunner,
                         path.resolve(projectPath),
                         atom.config.get('proto-repl.leinPath').replace("/lein",""),
                         atom.config.get('proto-repl.leinArgs').split(" ")

    # The process sends stdout
    @process.on 'proto-repl-process:data', (data) =>
      @appendText(data)

    # The nREPL port was captured from output
    @process.on 'proto-repl-process:nrepl-port', (port) =>
      @conn = @createConn({port: port})

    # The process exited.
    @process.on 'proto-repl-process:exit', ()=>
      @appendText("\nREPL Closed\n")
      # The REPL Text editor may or may not be still open at this point. We track
      # that separately.
      @process = null
      @conn = null

  running: ()->
    @process != null

  # Stops the running process
  stop: (session)->
    try
      # Tell the process to shutdown
      @conn?.eval(EXIT_CMD, "user", session)
      @conn?.close session, => return
    catch error
      console.log("Error trying to send exit command to REPL.", error)
    @conn = null
    # Kill the process to make sure.
    @process?.send event: 'kill'
    @process = null
