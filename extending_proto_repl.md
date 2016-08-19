# Extending Proto REPL

Proto REPL can be programmatically extended. The global `protoRepl` object can be used to send code to the REPL and perform other actions.

## Subscribing to events
Proto REPL supports a bunch of callbacks to detect when the REPL was connected, closed, or stopped. To subscribe to these events, you can use `onDidConnect`, `onDidClose` and `onDidStop`:

```CoffeeScript
protoRepl.onDidConnect ->
  console.log("REPL was started and we're connected to it!")

protoRepl.onDidClose ->
  console.log("REPL's window was closed!")

protoRepl.onDidStop ->
  console.log("REPL was stopped.")
```

## Defining a new REPL Command

You can define a new Atom command and keyboard shortcut to send code to the REPL. Open your Atom [init](https://atom.io/docs/latest/hacking-atom-the-init-file) file and add the following code.

```CoffeeScript
atom.commands.add 'atom-text-editor', 'custom:repl-hello', ->
  protoRepl.executeCode("(println \"Hi there!\")")
```

This adds a new Atom command called `custom:repl-hello`. It sends the code `(println "Hi there!")` to the REPL when it's invoked. After you edit your init file you'll need to reload Atom.

You can add a keyboard shortcut in the Atom Keymap file. This doesn't require a restart of Atom.

```
'.platform-darwin atom-text-editor':
  'cmd-alt-h': 'custom:repl-hello'
```

Now every time you press `cmd-alt-h` your REPL will print out "Hi there!".

## Defining REPL Commands on Selected Text

You can define more advanced REPL commands that use selected code from the editor or execute code in the namespace of the current file. Here's an example of how you would add a command that displays the documentation of the currently selected var. Note that this command is already part of Proto REPL itself.

```CoffeeScript
atom.commands.add 'atom-text-editor', 'custom:print-var-documentation', ->
  if editor = atom.workspace.getActiveTextEditor()
    if selected = editor.getSelectedText()
      protoRepl.executeCodeInNs("(clojure.repl/doc #{selected})")
```

More examples can be seen in the [ProtoRepl class](https://github.com/jasongilman/proto-repl/blob/master/lib/proto-repl.coffee).

## Code Execution Extensions

Proto REPL can be integrated with other packages via Code Execution Extensions. They allow other Atom packages to extend Proto REPL by taking output from the REPL and redirecting it for other uses like visualization.

Code execution extensions are triggered when the result of code execution is a vector where the first element is the keyword `:proto-repl-code-execution-extension`. The second element in the vector should be the name of the extension to trigger. The name will be used to locate the callback function. The third element in the vector is some data that will be passed to the callback function.

### Example

[Proto REPL Charts](https://github.com/jasongilman/proto-repl-charts) uses this mechanism to register itself with Proto REPL. When Proto REPL Charts starts it runs the following bit of code.

```CoffeeScript
protoRepl.registerCodeExecutionExtension("proto-repl-charts", (data)=> @display(data))
```

A proto-repl-charts Clojure library contains functions for "displaying" tables. All they do is return vectors with the special keyword noted above and the information to display. The `display` function above performs the actual display of the data.
