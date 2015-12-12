childProcess = require 'child_process'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'
envPath = filteredEnv["PATH"] || ""

processData = (data) ->
  emit('proto-repl-process:data', data.toString())

module.exports = (currentWorkingDir, leinPath, args) ->
  callback = @async()
  try
    filteredEnv["PATH"] = envPath + path.delimiter + leinPath
    leinExec = "lein"
    if process.platform == "win32"
      leinExec = "lein.bat"

    # console.log("Forking with:")
    # console.log({args: args, cmd: currentWorkingDir, env: filteredEnv})
    replProcess = childProcess.spawn leinExec, args, cwd: currentWorkingDir, env: filteredEnv

    replProcess.on 'error', (error)->
      processData("Error starting repl: " + error +
      "\nYou may need to configure the lein path in proto-repl settings\n")

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
