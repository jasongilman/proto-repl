childProcess = require 'child_process'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'

processData = (data) ->
  emit('proto-repl-process:data', data.toString())

module.exports = (currentWorkingDir, shell, args, options={}) ->
  callback = @async()

  # console.log("Forking with:")
  # console.log({shell: shell, args: args, cmd: currentWorkingDir, env: filteredEnv})
  replProcess = childProcess.spawn shell, args, cwd: currentWorkingDir, env: filteredEnv

  replProcess.stdout.on 'data', processData
  replProcess.stderr.on 'data', processData

  replProcess.on 'close', (code)->
    emit('proto-repl-process:exit')
    callback()

  process.on 'message', ({event, cols, rows, text}={}) ->
    switch event
      when 'input' then replProcess.stdin.write(text)

