childProcess = require 'child_process'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'


module.exports = (currentWorkingDir, leinPath, args) ->
  callback = @async()
  try
    if process.platform == "win32"
      # Windows
      if leinPath.endsWith("lein.bat")
        leinExec = leinPath
      else
        leinExec = path.join(leinPath, "lein.bat")
      envPath = filteredEnv["Path"] || ""
      filteredEnv["Path"] = envPath + path.delimiter + leinPath
    else
      # Mac/Linux
      leinExec = "lein"
      envPath = filteredEnv["PATH"] || ""
      filteredEnv["PATH"] = envPath + path.delimiter + leinPath

    replProcess = childProcess.spawn leinExec, args, cwd: currentWorkingDir, env: filteredEnv

    replProcess.on 'error', (error)->
      processData("Error starting repl: " + error +
      "\nYou may need to configure the lein path in proto-repl settings\n")

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

    replProcess.stdout.on 'data', processData
    replProcess.stderr.on 'data', processData

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
