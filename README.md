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

### Sending Code to the REPL

Code can be sent to the REPL from within the REPL itself or any other open text editor. For example if you have some Clojure code in a Markdown file that can be sent to the REPL as well.

#### Sending a Block

A block of Clojure code is code that's delimited by parentheses `()`, curly braces `{}` (defines a map literal in Clojure), or square brackets `[]` (defines a vector literal in Clojure). The key binding `cmd-alt-b` can be used to send a block from the current text editor. The block that is sent depends on the position of the cursor. The cursor may be located nested inside several blocks, directly after a block, or before a block. The logic for block finding searches for blocks in the following order.

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

An arbitrary set of selected Clojure code can be sent to the REPL by selecting the code and using the key binding `cmd-alt-s`. This allows sending multiple blocks of code at once.

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
* [lisp-paredit](https://atom.io/packages/lisp-paredit)

## Keybindings and Events

| Keybinding        | Event                                 | Action                                                                                                                                   |
|-------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `cmd-alt-L`       | `proto-repl:toggle`                   | Starts the REPL                                                                                                                          |
| `ctrl-L`          | `proto-repl:clear-repl`               | Clears REPL Output                                                                                                                       |
| `ctrl-d`          | `proto-repl:exit-repl`                | Exits the REPL                                                                                                                           |
| `cmd-alt-shift-s` | `proto-repl:toggle-auto-scroll`       | Enables/Disables autoscrolling the REPL                                                                                                  |
| `cmd-alt-b`       | `proto-repl:execute-block`            | Sends the current block of Clojure code to the REPL for execution.                                                                       |
| `cmd-alt-s`       | `proto-repl:execute-selected-text`    | Sends the selected text to the REPL for execution.                                                                                       |
| `cmd-alt-shift-f` | `proto-repl:load-current-file`        | Loads the current file in the repl.                                                                                                      |
| `cmd-alt-r`       | `proto-repl:refresh-namespaces`       | Runs the `user/reset` function. See [My Clojure Workflow, Reloaded](http://thinkrelevance.com/blog/2013/06/04/clojure-workflow-reloaded) |
| `cmd-alt-shift-r` | `proto-repl:super-refresh-namespaces` | Clears all loaded namespaces using `clojure.tools.namespace` the runs the `user/reset` function.                                         |
| `cmd-alt-p`       | `proto-repl:pretty-print`             | Pretty prints the last value returned at the REPL.                                                                                       |
| `cmd-alt-x`       | `proto-repl:run-tests-in-namespace`   | Runs all the tests in the current namespace.                                                                                             |
| `cmd-alt-t`       | `proto-repl:run-selected-test`        | Runs the test that's selected.                                                                                                           |
| `cmd-alt-a`       | `proto-repl:run-all-tests`            | Runs all the test in the current project.                                                                                                |
| `cmd-alt-d`       | `proto-repl:print-var-documentation`  | Prints the documentation with the current selected var.                                                                                  |
| `cmd-alt-c`       | `proto-repl:print-var-code`           | Prints out the code of the current selected var.                                                                                         |
| `cmd-alt-o`       | `proto-repl:open-file-containing-var` | Opens the code of the current selected var or namespace. This works even with vars defined in libraries.                                 |
| `cmd-alt-n`       | `proto-repl:list-ns-vars`             | Lists the vars in the selected namespace.                                                                                                |
| `cmd-alt-shift-n` | `proto-repl:list-ns-vars-with-docs`   | Lists the vars in the selected namespace with documentation.                                                                             |


## Potential Future Enhancements

* Ability to connect to existing Clojure processes using nrepl.
* Visualize function call graph.
