# Proto REPL

Proto REPL is a Clojure development environment and REPL for [Atom](https://atom.io). See the [features](#features) and [installation instructions](#installation). See the [proto-repl-demo](https://github.com/jasongilman/proto-repl-demo) project for a demonstration of the features.

![A screenshot of Proto REPL](https://github.com/jasongilman/proto-repl/raw/master/front_image.png)

## Features

* An interactive REPL driven development environment.
* Evaluate blocks of code or selected code with a keystroke.
* Easily run tests in a namespace or the whole project.
* View documentation and code from linked Clojure libraries.
* [Atom Tool Bar](https://atom.io/packages/tool-bar) integration that allows controlling the REPL.

## Usage

Proto REPL currently only works with projects using [Leiningen](http://leiningen.org).

1. Open your Clojure project in Atom. (See [the Leiningen tutorial](https://github.com/technomancy/leiningen/blob/stable/doc/TUTORIAL.md#creating-a-project) for help creating a new project.)
2. Start the REPL by bring up the Command Palette (cmd-alt-p) and select "Proto REPL: Toggle"

See https://github.com/jasongilman/proto-repl-demo/blob/master/demos.md for a demonstration of the features of Proto REPL and more of a description on how it works.

### Usage Outside of Leiningen Projects

Proto REPL can still start a REPL outside of a Leiningen project. It still uses Leiningen to start the REPL but uses a default project shipped with Proto REPL. This allows you to easily open up any Clojure file or even just a new Atom window and kick off a new REPL for experimenting.

### Sending Code to the REPL

Code can be sent to the REPL from within the REPL itself or any other open text editor. For example if you have some Clojure code in a Markdown file that can be sent to the REPL as well.

#### Sending a Block

A block of Clojure code is code that's delimited by parentheses `()`, curly braces `{}` (defines a map literal in Clojure), or square brackets `[]` (defines a vector literal in Clojure). The key binding `ctrl-, b` (Press ctrl and comma together, release, then press b) can be used to send a block from the current text editor. The block that is sent depends on the position of the cursor. The cursor may be located nested inside several blocks, directly after a block, or before a block. The logic for block finding searches for blocks in the following order.

1. A block directly after the cursor.
2. A block directly before the cursor.
3. The first block the cursor is nested within.

Examples: The following examples show some sample Clojure code using a `|` to indicate cursor position.

Code                                     | Code sent to REPL   | Why?
-----------------------------------------|---------------------|-----------------------------
<code>&#124;(foo 1 2)</code>             | `(foo 1 2)`         | Cursor directly before block
<code>(foo 1 2)&#124;</code>             | `(foo 1 2)`         | Cursor directly after block
<code>(a (b &#124;(c (foo 1 2))))</code> | `(c (foo 1 2))`     | Cursor directly before `c` block
<code>(a (b&#124; (c (foo 1 2))))</code> | `(b (c (foo 1 2)))` | Cursor inside `b` block

##### Markdown Blocks

The block detection also can find the start and end of a Github Flavored Markdown Clojure blocks. If the cursor is outside of a Clojure block but within a Markdown Clojure Block (Starts with ` ```clojure` and ends with ` ``` `) then all of the code in the Markdown block will be sent.

#### Sending a Selection

An arbitrary set of selected Clojure code can be sent to the REPL by selecting the code and using the key binding `ctrl-, s` (Press ctrl and comma together, release, then press s). This allows sending multiple blocks of code at once.

### Limitations

These are known current limitations of Proto REPL. They may be addressed in the future.

* Currently only works with Leiningen projects.
* You can only start one REPL per Atom window.

## Installation

`apm install proto-repl` or go to your Atom settings, select "+ Install" and search for "proto-repl".

Make sure that the path to the `lein` command is correct in the proto-repl settings. Use `which lein` in a terminal to get the path.

### Dependencies

* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Leiningen](http://leiningen.org)

### Tool Bar Integration

Proto REPL integrates with the [Atom Tool Bar package](https://atom.io/packages/tool-bar) to provide buttons for common REPL actions. Install tool-bar and then restart Proto REPL to get quick access to actions like refreshing namespaces, pretty printing, and toggling REPL scrolling.

### Recommended Atom Settings

Change the "Non Word Characters" setting in Atom to

```
(){}[]\"',;<>~#$%^&*|+=`…
```

Doing this allows you to select namespaces with var definitions in Clojure as a single word.

### Recommended Additional Packages

These packages go well with Proto REPL.

* [tool-bar](https://atom.io/packages/tool-bar)
* [parinfer](https://atom.io/packages/parinfer)

## Extending Proto REPL

Proto REPL can be programmatically extended. The global `protoRepl` object can be used to send code to the REPL and perform other actions.

### Defining a new REPL Command

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

### Defining REPL Commands on Selected Text

You can define more advanced REPL commands that use selected code from the editor or execute code in the namespace of the current file. Here's an example of how you would add a command that displays the documentation of the currently selected var. Note that this command is already part of Proto REPL itself.

```CoffeeScript
atom.commands.add 'atom-text-editor', 'custom:print-var-documentation', ->
  if editor = atom.workspace.getActiveTextEditor()
    if selected = editor.getSelectedText()
      protoRepl.executeCodeInNs("(clojure.repl/doc #{selected})")
```

More examples can be seen in the [ProtoRepl class](https://github.com/jasongilman/proto-repl/blob/master/lib/proto-repl.coffee).

## Keybindings and Events

Keyboard shortcuts below refer to using `ctrl-,` then a letter. That means press the `ctrl` key and the comma key at the same time, release them, and then press the subsequent letter. Some keyboard shortcuts also include the shift key.

| Keybinding       | Event                                 | Action                                                                                                                                   |
|------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `ctrl-, L`       | `proto-repl:toggle`                   | Starts the REPL                                                                                                                          |
| `ctrl-, e`       | `proto-repl:exit-repl`                | Exits the REPL                                                                                                                           |
| `ctrl-, k`       | `proto-repl:clear-repl`               | Clears REPL Output                                                                                                                       |
| `ctrl-shift-, s` | `proto-repl:toggle-auto-scroll`       | Enables/Disables autoscrolling the REPL                                                                                                  |
| `ctrl-, b`       | `proto-repl:execute-block`            | Sends the current block of Clojure code to the REPL for execution.                                                                       |
| `ctrl-, B`       | `proto-repl:execute-top-block`        | Sends the current top-level block of Clojure code to the REPL for execution.                                                                       |
| `ctrl-, s`       | `proto-repl:execute-selected-text`    | Sends the selected text to the REPL for execution.                                                                                       |
| `ctrl-, f`       | `proto-repl:load-current-file`        | Loads the current file in the repl.                                                                                                      |
| `ctrl-, r`       | `proto-repl:refresh-namespaces`       | Runs the `user/reset` function. See [My Clojure Workflow, Reloaded](http://thinkrelevance.com/blog/2013/06/04/clojure-workflow-reloaded) |
| `ctrl-shift-, r` | `proto-repl:super-refresh-namespaces` | Clears all loaded namespaces using `clojure.tools.namespace` the runs the `user/reset` function.                                         |
| `ctrl-, p`       | `proto-repl:pretty-print`             | Pretty prints the last value returned at the REPL.                                                                                       |
| `ctrl-, x`       | `proto-repl:run-tests-in-namespace`   | Runs all the tests in the current namespace.                                                                                             |
| `ctrl-, t`       | `proto-repl:run-selected-test`        | Runs the test that's selected.                                                                                                           |
| `ctrl-, a`       | `proto-repl:run-all-tests`            | Runs all the test in the current project.                                                                                                |
| `ctrl-, d`       | `proto-repl:print-var-documentation`  | Prints the documentation with the current selected var.                                                                                  |
| `ctrl-, c`       | `proto-repl:print-var-code`           | Prints out the code of the current selected var.                                                                                         |
| `ctrl-, o`       | `proto-repl:open-file-containing-var` | Opens the code of the current selected var or namespace. This works even with vars defined in libraries.                                 |
| `ctrl-, n`       | `proto-repl:list-ns-vars`             | Lists the vars in the selected namespace.                                                                                                |
| `ctrl-shift-, n` | `proto-repl:list-ns-vars-with-docs`   | Lists the vars in the selected namespace with documentation.                                                                             |
| `shift-ctrl-c`   | `proto-repl:interrupt`                | Attempts to interrupt the currently running command in the REPL.                                                                         |
