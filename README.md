# Proto REPL

Proto REPL is a Clojure development environment and REPL for [Atom](https://atom.io). See the [features](#features) and [installation instructions](#installation). See the [proto-repl-demo](https://github.com/jasongilman/proto-repl-demo) project for a demonstration of the features.

![A screenshot of Proto REPL](https://github.com/jasongilman/proto-repl/raw/master/front_image.gif)

## Features

* An interactive REPL driven development environment.
* Evaluate [blocks of code](#sending-a-block) or [selected code](#sending-a-selection) with a keystroke.
* View results in the REPL or [inline next to the code](#inline-results).
* [Automatic Evaluation Mode](#automatic-evaluation-mode) that executes code in a file as you type.
* Easily run tests in a namespace or the whole project.
* View documentation and code from linked Clojure libraries.
* [Atom Tool Bar](https://atom.io/packages/tool-bar) integration that allows controlling the REPL.
* Extensible with the ability to [add your own commands](#extending-proto-repl) or [create visualizations](https://github.com/jasongilman/proto-repl-charts).

## Usage

### Start a Local REPL

Proto REPL currently only works with projects using [Leiningen](http://leiningen.org).

1. Open your Clojure project in Atom. (See [the Leiningen tutorial](https://github.com/technomancy/leiningen/blob/stable/doc/TUTORIAL.md#creating-a-project) for help creating a new project.)
2. Start the REPL by bring up the Command Palette (cmd-alt-p) and select "Proto REPL: Toggle"
  * The REPL can also be started by using the [keyboard shortcuts documented below](#keybindings-and-events).

See the [Proto REPL Demo project](https://github.com/jasongilman/proto-repl-demo) for a demonstration of the features of Proto REPL and more of a description on how it works.

### Connecting to a Remote REPL

Proto REPL can connect to a remote Clojure process using [nREPL](https://github.com/clojure/tools.nrepl). Connect to the remote REPL by triggering the Command Palette (cmd-alt-p) and selecting "Proto REPL: Remote Nrepl Connection". Enter the host and port of the remote nREPL server and it will connect.

### Usage Outside of Leiningen Projects

Proto REPL can still start a REPL outside of a Leiningen project. It still uses Leiningen to start the REPL but uses a default project shipped with Proto REPL. This allows you to easily open up any Clojure file or even just a new Atom window and kick off a new REPL for experimenting.

### Typing in the REPL

Code to be executed in the REPL can be entered by typing below the dashed line. Code can be executed by pressing `shift+enter`. The REPL maintains a history of executed commands that were entered in the REPL. The history can be navigated by using the up and down arrow keys after placing the cursor in the text entry area.

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

### Inline Results Display

Inline display of executed blocks or selections is supported if you have the [Atom Ink](https://github.com/JunoLab/atom-ink) package installed. You can disable inline results through the configuration. The values displayed inline are shown in a tree like view that lets you explore large nested data structures without having to view all of the data.

![inline results screenshot](https://github.com/jasongilman/proto-repl/raw/master/images/inline_results.gif)

### Automatic Evaluation Mode

(Automatic Evaluation is in beta and subject to change. [Please report any issues or suggestions for improvement](https://github.com/jasongilman/proto-repl/issues).)

Proto REPL supports the automatic evaluation of top level forms as you type. The results are displayed inline next to each top level form. This requires [Atom Ink](https://github.com/JunoLab/atom-ink) to be installed. Automatic Evaluation Mode can be started for a file by toggling the Atom Command Palette (cmd-alt-p) and selecting "Proto Repl: Autoeval File". It can be stopped by toggling the Atom Command Palette (cmd-alt-p) and selecting "Proto Repl: Stop Autoeval File"

![automatic evaluation mode screenshot](https://github.com/jasongilman/proto-repl/raw/master/images/autoeval.gif)

The visualization shown was created with [Proto REPL Charts](https://atom.io/packages/proto-repl-charts).

### Saving and Viewing Local Binding Values

(Saving and Viewing Local Binding Values is in beta and subject to change. [Please report any issues or suggestions for improvement](https://github.com/jasongilman/proto-repl/issues).)

When you are inside a function or a let block in Clojure there are symbols that have a value. In this example code which sums up `m`, `a`, and `b` are all local bindings.

```Clojure
(reduce (fn [m [a b]]
         (update m a #(+ b (or % 0))))
       {}
       [[:apples 2] [:oranges 3] [:apples 4] [:cherries 7]])
=>
{:apples 6, :oranges 3, :cherries 7}
```

While this code is simple it can be difficult to understand what's happening inside functions and loops. A lot of developers reach for logging or printing to debug this kind of code. When you do that across multiple functions and namespaces those values are mixed together and separate from the code. Proto REPL's new feature for saving and viewing local bindings let's you see the values in context and from multiple requests.

The following code was the same as before but now it has `(proto/save 1)`. The `proto/save` function saves all the local bindings so that they can be viewed in the editor. The `1` in `(proto/save 1)` is just a unique id to tie the saved values back to the editor for display.

```Clojure
(reduce (fn [m [a b]]
         (proto/save 1)
         (update m a #(+ b (or % 0))))
       {}
       [[:apples 2] [:oranges 3] [:apples 4] [:cherries 7]])
=>
{:apples 6, :oranges 3, :cherries 7}
```

After running the code invoking the command `proto-repl:display-saved-value` will display the values in a table.

![saved values table](https://github.com/jasongilman/proto-repl/raw/master/images/saved_values_table.png)

Tables are limited in the amount of detail that can be shown. Proto REPL will truncate long Clojure data structures to fit into a column. Each row of the table can be expanded to explore the details of large data structures.

![saved values table expanded](https://github.com/jasongilman/proto-repl/raw/master/images/saved_values_table_expanded.png)

#### Using the save value feature

1. Add dependency to proto-repl-lib in your project's dependencies. `[proto-repl-lib "0.1.0"]`
2. Insert a call to `proto/save` in the code using the keybinding `ctrl-shift-, i` (Press ctrl shift comma together, release then i) This just inserts the save call with a unique number.
3. Execute your code. If you've placed the code in a function or across multiple namespaces you'll need to redefine the modified code or refresh.
4. Show the values by pressing the keybinding `ctrl-shift-, d`
5. Saved values can be cleared with the keybinding `ctrl-shift-, c`

There's a limit of 20 saved values currently in proto-repl-lib. After debugging any issues make sure to remove the save calls. They're not meant to be used in local development only.


## Installation

`apm install proto-repl` or go to your Atom settings, select "+ Install" and search for "proto-repl".

Make sure that the path to the `lein` command is correct in the Proto REPL settings. Proto REPL settings can be accessed in Atom by opening "Preferences" from the main menu, then selecting the "Packages" tab. Proto REPL will be one of the packages listed. Click the "Settings" button there and look for the "Lein Path" setting. Use `which lein` in a terminal to get the path.

### Dependencies

* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Leiningen](http://leiningen.org)

Supports Clojure 1.6 or greater.

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

* [proto-repl-charts](https://atom.io/packages/proto-repl-charts)
* [tool-bar](https://atom.io/packages/tool-bar)
* [parinfer](https://atom.io/packages/parinfer)
* [lisp-paredit](https://atom.io/packages/lisp-paredit)

## Extending Proto REPL

See [extending_proto_repl.md](#/extending_proto_repl.md)

## Keybindings and Events

Keyboard shortcuts below refer to using `ctrl-,` then a letter. That means press the `ctrl` key and the comma key at the same time, release them, and then press the subsequent letter. Some keyboard shortcuts also include the shift key.

| Keybinding       | Event                                 | Action                                                                                                                                   |
|------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `ctrl-, L`       | `proto-repl:toggle`                   | Starts the REPL                                                                                                                          |
| `ctrl-, shift-L` | `proto-repl:toggle`                   | Starts the REPL using the current open project.clj                                                                                       |
|                  | `proto-repl:remote-nrepl-connection`  | Connects to a remote nREPL session.                                                                                                      |
| `ctrl-, e`       | `proto-repl:exit-repl`                | Exits the REPL                                                                                                                           |
| `ctrl-, k`       | `proto-repl:clear-repl`               | Clears REPL Output                                                                                                                       |
| `ctrl-shift-, s` | `proto-repl:toggle-auto-scroll`       | Enables/Disables autoscrolling the REPL                                                                                                  |
| `ctrl-, b`       | `proto-repl:execute-block`            | Sends the current block of Clojure code to the REPL for execution.                                                                       |
| `ctrl-, B`       | `proto-repl:execute-top-block`        | Sends the current top-level block of Clojure code to the REPL for execution.                                                             |
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
| `ctrl-shift-, i` | `proto-repl:insert-save-value-call`   | Inserts a call to `proto/save` with a unique id                                                                                          |
| `ctrl-shift-, d` | `proto-repl:display-saved-values`     | Displays values saved using the `proto/save` function.                                                                                   |
| `ctrl-shift-, c` | `proto-repl:clear-saved-values`       | Clears previously saved values using the `proto/save` function.                                                                          |
