childProcess = require 'child_process'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'


module.exports = (currentWorkingDir, args) ->
  callback = @async()

  # The nREPL port is extracted from the output of the REPL process.
  # proto-repl-process:nrepl-port is emitted with the nREPL port is found.
  portFound = false

  processData = (data) ->
    dataStr = data.toString()

    if !portFound
      if match = dataStr.match(/.*nREPL.*port\s+(\d+)/)
        portFound = true
        port = Number(match[1])
        emit('proto-repl-process:nrepl-port', port)

    emit('proto-repl-process:data', dataStr)

  try
    if process.platform == "win32"
      # Windows
      gradleExec = "gradlew.bat"
      replProcess = childProcess.spawn gradleExec, args, cwd: currentWorkingDir, env: filteredEnv, shell: true
    else
      # Mac/Linux
      gradleExec = "gradlew"
      replProcess = childProcess.spawn gradleExec, args, cwd: currentWorkingDir, env: filteredEnv

    replProcess.stdout.on 'data', processData
    replProcess.stderr.on 'data', processData

    replProcess.on 'error', (error)->
      processData("Error starting repl: " + error +
      "\nYou may need to configure the gradle path or args in proto-repl settings\n")

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
          # Send CTRL+D to Gradle to tell it to stop the NREPL gracefully
          replProcess.stdin.write("\x04")
          run = () -> replProcess.kill("SIGKILL")
          setTimeout run, 2500
    catch error
      console.error error
