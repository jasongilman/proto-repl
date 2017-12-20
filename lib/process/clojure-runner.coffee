childProcess = require 'child_process'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'


module.exports = (currentWorkingDir, clojurePath) ->
  callback = @async()

  args = [
    "-e",
    "(do
      (require '[clojure.tools.nrepl.server :refer [start-server]])
      (let [port (:port (start-server))]
        (println (str \"nREPL server started on port \" port \" on host 127.0.0.1\"))
        (println (str \"- nrepl://127.0.0.1:\" port))))",
    "-r"
  ]

  # The nREPL port is extracted from the output of the REPL process. We could
  # look on the file system for the .nrepl-port file which is more standard
  # but there are issues if you want to start multiple REPLs in the same project.
  # proto-repl-process:nrepl-port is emitted with the nREPL port is found.
  portFound = false

  processData = (data) ->
    dataStr = data.toString()

    if !portFound
      if match = dataStr.match(/.*nREPL.*port (\d+)/)
        portFound = true
        port = Number(match[1])
        emit('proto-repl-process:nrepl-port', port)

    emit('proto-repl-process:data', dataStr)

  try
    # Mac/Linux
    clojureExec = "clj"
    envPath = filteredEnv["PATH"] || ""
    filteredEnv["PATH"] = envPath + path.delimiter + clojurePath
    replProcess = childProcess.spawn clojureExec, args, cwd: currentWorkingDir, env: filteredEnv

    replProcess.stdout.on 'data', processData
    replProcess.stderr.on 'data', processData

    replProcess.on 'error', (error)->
      processData("Error starting repl: " + error +
      "\nYou may need to configure the clojure path in proto-repl settings\n")

    replProcess.on 'close', (code)->
      emit('proto-repl-process:exit')
      callback()
  catch error
    processData("Error starting repl: " + error)

  process.on 'message', ({event, text}={}) ->
    try
      switch event
        when 'input'
          replProcess.stdin.write(text)
        when 'kill'
          replProcess.kill("SIGKILL")
    catch error
      console.error error
