pty = require 'pty.js'
path = require 'path'
fs = require 'fs'
_ = require 'underscore'

console.log("hello! I'm loaded")

filteredEnv = _.omit process.env, 'ATOM_HOME', 'ATOM_SHELL_INTERNAL_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath'

module.exports = (ptyCwd, shell, args, options={}) ->
  callback = @async()

  console.log("exports?")

#   # if /zsh|bash/.test(shell) and args.indexOf('--login') == -1
#   #   args.unshift '--login'

  console.log("Forking with:")
  console.log({shell: shell, args: args, cmd: ptyCwd, env: filteredEnv})
  ptyProcess = pty.fork shell, args, cwd: ptyCwd, env: filteredEnv

#   # title = shell = path.basename shell

  ptyProcess.on 'data', (data) ->
    console.log("data!" + data)
    emit('proto-repl-process:data', data)

#   # ptyProcess.on 'data', ->
#   #   newTitle = ptyProcess.process
#   #   if newTitle is shell
#   #     emit('terminal-plus:clear-title')
#   #   else unless title is newTitle
#   #     emit('terminal-plus:title', newTitle)
#   #   title = newTitle

  ptyProcess.on 'exit', ->
    emit('proto-repl-process:exit')
    callback()

#   # process.on 'message', ({event, cols, rows, text}={}) ->
#   #   switch event
#   #     when 'resize' then ptyProcess.resize(cols, rows)
#   #     when 'input' then ptyProcess.write(text)

console.log("I'm done")