childProcess = require 'child_process'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'

processData = (data) ->
  console.log("pty data [#{data}]")
  emit('proto-repl-process:data', data.toString())

module.exports = (ptyCwd, shell, args, options={}) ->
  callback = @async()

  console.log("Forking with:")
  console.log({shell: shell, args: args, cmd: ptyCwd, env: filteredEnv})
  # ptyProcess = pty.fork shell, args, cwd: ptyCwd, env: filteredEnv
  ptyProcess = childProcess.spawn shell, args, cwd: ptyCwd, env: filteredEnv

  ptyProcess.stdout.on 'data', processData
  ptyProcess.stderr.on 'data', processData

  ptyProcess.on 'close', (code)->
    console.log("Child process stopped with code #{code}")
    emit('proto-repl-process:exit')
    callback()

  process.on 'message', ({event, cols, rows, text}={}) ->
    switch event
      # when 'resize' then ptyProcess.resize(cols, rows)
      when 'input' then ptyProcess.stdin.write(text)

