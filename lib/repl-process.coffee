childProcess = require 'child_process'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'

processData = (data) ->
  emit('proto-repl-process:data', data.toString())

module.exports = (currentWorkingDir, shell, args, options={}) ->
  callback = @async()
  try
    # console.log("Forking with:")
    # console.log({shell: shell, args: args, cmd: currentWorkingDir, env: filteredEnv})
    replProcess = childProcess.spawn shell, args, cwd: currentWorkingDir, env: filteredEnv

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

  process.on 'message', ({event, cols, rows, text}={}) ->
    switch event
      when 'input'
        try
          replProcess.stdin.write(text)
        catch error
          console.error error
