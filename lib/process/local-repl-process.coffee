{Task} = require 'atom'
LeinRunner = require.resolve './lein-runner'
BootRunner = require.resolve './boot-runner'
GradleRunner = require.resolve './gradle-runner'
ClojureRunner = require.resolve './clojure-runner'
path = require 'path'
fs = require('fs')
NReplConnection = require './nrepl-connection'

# The code to send to the repl to exit.
EXIT_CMD="(System/exit 0)"

module.exports=
# Represents a locally running REPL process.
class LocalReplProcess

  # A set of functions for writing text to the REPL.
  replView: null

  # The nREPL connection
  conn: new NReplConnection()

  # reference to a running process
  process: null

  constructor: (@replView)->
    null

  getType: ->
    "Local"

  # Searches upwords to find the root dTproject if proto repl was opened in a
  # subdirectory of the project.
  getRootProject: (currentPath, limit=0) ->
    # Avoid errors if the Atom config directory is open. We can't treat this like
    # a normal directory.
    if currentPath.startsWith("atom://")
      return

    # Try to find the root of the current project by searching
    # for one of the configuration files
    # build.boot (Boot) or
    # project.clj (Leiningen) or
    # gradlew or gradlew.bat (Gradle)
    parentDirectory = path.resolve(currentPath, "..")

    if currentPath != parentDirectory and limit < 100
      matches = fs.readdirSync(currentPath).filter (f) ->
        f == "project.clj" or f == "build.boot" or
        f == "gradlew" or f == "gradlew.bat" or
        f == "deps.edn"

      if currentPath and matches.length == 0
        @getRootProject(parentDirectory, limit + 1)
      else
        currentPath unless matches.length == 0

  # Returns the path to a default project to use if proto repl is started
  # outside of a leiningen or boot project
  getDefaultProjectPath: ()->
    # Atom returns multiple possible package dirs so we must search for one that
    # exists.
    for p in atom.packages.getPackageDirPaths()
      possiblePath = p + "/proto-repl/proto-no-proj"
      try
        # If this succeeds without error the path exists
        fs.lstatSync(possiblePath)
        return possiblePath
      catch error
        null

  start: (projectPath, connOptions)->
    if @running()
      return

    # Default project path to the current directory. This can still set the
    # projectPath to null if no file is opened in atom.
    unless projectPath?
      projectPath = atom.project.getPaths()[0]

    # Search for a project.clj or build.boot or gradle wrapper
    # file. The if must be used in case of no directory open in Atom.
    projectPath = @getRootProject(projectPath) if projectPath

    replsFound = []
    replsFound.push "boot" if fs.existsSync(projectPath + "/build.boot")
    replsFound.push "lein" if fs.existsSync(projectPath + "/project.clj")
    replsFound.push "clojure" if fs.existsSync(projectPath + "/deps.edn")
    replsFound.push "gradle" if fs.existsSync(projectPath + "/gradlew") or
      fs.existsSync(projectPath + "/gradlew.bat")

    # If we're not in a project or there isn't a
    # project file use the default leiningen project
    if (projectPath?)
      if replsFound.length
        for repl in atom.config.get("proto-repl.preferredRepl")
          if repl in replsFound
            replType = repl
            break
      else
        replType = "lein"
        projectPath = @getDefaultProjectPath()
    else
      replType = "lein"
      projectPath = @getDefaultProjectPath()

    @replView.info("Starting REPL with #{replType} in #{projectPath}\n", true)

    # Start the repl process as a background task
    switch replType
      when "gradle"
        @process = Task.once GradleRunner,
                             path.resolve(projectPath),
                             atom.config.get('proto-repl.gradleArgs').split(" ")
      when "boot"
        @process = Task.once BootRunner,
                             path.resolve(projectPath),
                             atom.config.get('proto-repl.bootPath').replace("/boot",""),
                             atom.config.get('proto-repl.bootArgs').split(" ")
      when "clojure"
        @process = Task.once ClojureRunner,
                             path.resolve(projectPath),
                             atom.config.get('proto-repl.clojurePath').replace("/clj","")
      # when "lein" then
      else
        @process = Task.once LeinRunner,
                             path.resolve(projectPath),
                             atom.config.get('proto-repl.leinPath').replace("/lein",""),
                             atom.config.get('proto-repl.leinArgs').split(" ")


    # The process sends stdout
    @process.on 'proto-repl-process:data', (data) =>
      @replView.stdout(data)

    # The nREPL port was captured from output
    @process.on 'proto-repl-process:nrepl-port', (port) =>
      connOptions.port = port
      @conn.start(connOptions)

    # The process exited.
    @process.on 'proto-repl-process:exit', ()=>
      # The REPL Text editor may or may not be still open at this point.
      # We track that separately.
      # TODO would it be better to move the stop callback into the nrepl connection?
      connOptions?.stopCallback()
      @process = null
      @conn.close()
      @replView.info("REPL Closed")

  running: ()->
    @process != null && @conn.connected()

  sendCommand: (code, options, resultHandler)->
    @conn.sendCommand(code, options, resultHandler)

  getCurrentNs: ->
    @conn.getCurrentNs()

  interrupt: ->
    @conn.interrupt()
    @replView.info("Interrupting")

  # Stops the running process
  stop: ()->
    @conn.close()
    @process?.send event: 'kill'
    @process = null
