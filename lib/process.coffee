pty = require 'pty.js'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'

module.exports = (ptyCwd, shell, args, options={}) ->
  callback = @async()

  # console.log("Forking with:")
  # console.log({shell: shell, args: args, cmd: ptyCwd, env: filteredEnv})
  ptyProcess = pty.fork shell, args, cwd: ptyCwd, env: filteredEnv

  ptyProcess.on 'data', (data) ->
    console.log("pty data [#{data}]")
    emit('proto-repl-process:data', data)


  ptyProcess.on 'exit', ->
    emit('proto-repl-process:exit')
    callback()

  process.on 'message', ({event, cols, rows, text}={}) ->
    switch event
      # when 'resize' then ptyProcess.resize(cols, rows)
      when 'input' then ptyProcess.write(text)

