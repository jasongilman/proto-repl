# Proto REPL

Proto REPL is a Clojure development environment and REPL for [Atom](https://atom.io). See the [features](#features) and [installation instructions](#installation). See the [proto-repl-demo](https://github.com/jasongilman/proto-repl-demo) project for a demonstration of the features.

![A screenshot of Proto REPL](https://github.com/jasongilman/proto-repl/raw/master/front_image.gif)

## Features

* An interactive REPL driven development environment.
* [Autocompleting](#autocompletion) Clojure namespaces, function names, vars, and local bindings
* Evaluate [blocks of code](#sending-a-block) or [selected code](#sending-a-selection) with a keystroke.
* View results in the REPL or [inline next to the code](#inline-results).
* [Automatic Evaluation Mode](#automatic-evaluation-mode) that executes code in a file as you type.
* Easily run tests in a namespace or the whole project.
* View documentation and code from linked Clojure libraries.
* [Atom Tool Bar](https://atom.io/packages/tool-bar) integration that allows controlling the REPL.
* Extensible with the ability to [add your own commands](#extending-proto-repl) or [create visualizations](https://github.com/jasongilman/proto-repl-charts).

## Videos/Blog Posts

* [Clojure Conj 2016 video](https://youtu.be/buPPGxOnBnk) - Talks about history and reasoning behind Proto REPL. Skip to [11:55](https://youtu.be/buPPGxOnBnk?t=11m55s) for demos including [Proto REPL Charts](https://github.com/jasongilman/proto-repl-charts)
* [Purely Functional](https://purelyfunctional.tv/speaker-interview/jason-gilman-clojureconj-2016-interview/) interview for Clojure Conj 2016
* [Data Visualization with Proto REPL Charts video](https://youtu.be/BJUI1ntfPy8)
* [Blog Post Announcing Proto REPL Charts](http://blog.element84.com/proto-repl-update.html)
* [Original Blog Post Announcement](http://blog.element84.com/introducing-proto-repl.html)


## Getting Started

### Option 1. Quick Start

These are the instructions get up and running quickly. Most features will work but for the best results see [Option 2](#option-2-opinionated-complete-best-way-to-setup-atom-for-clojure-development-with-proto-repl).

1. Install [Atom](https://atom.io/).
2. Install [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html) and [Leiningen](http://leiningen.org/) or [Boot](https://github.com/boot-clj/boot)
3. Go to Atom settings, select "+ Install" and search for "proto-repl".
5. Install the Atom Ink package.
6. Go to the Proto REPL Settings (Atom Preferences, then packages, then Proto REPL)
7. Modify "Lein Path" or "Boot Path" to the path where Leiningen/Boot was installed. Use `which lein` in a terminal to get the path.
  * This should be something like `/some/path/bin/lein`
  * If using Boot deselect the option for Prefer Leiningen.
8. Restart Atom.
9. [Start a REPL](#start-a-local-clojure-repl)

See the [Proto REPL Demo project](https://github.com/jasongilman/proto-repl-demo) for a demonstration of the features of Proto REPL.

### Option 2. Opinionated, Complete, Best Way to Setup Atom for Clojure Development with Proto REPL

Follow the instructions here: [https://git.io/atom_clojure_setup](https://git.io/atom_clojure_setup)

### Setting up an Existing Clojure Project

Add the [![Clojars Project](https://img.shields.io/clojars/v/proto-repl.svg)](https://clojars.org/proto-repl) library as a dependency.

## Usage

### Start a Local Clojure REPL

A local Proto REPL primarily works with projects using [Leiningen](http://leiningen.org) or [Boot](http://boot-clj.com/).

1. Open your Clojure project in Atom. (See [the Leiningen tutorial](https://github.com/technomancy/leiningen/blob/stable/doc/TUTORIAL.md#creating-a-project)
or [the Boot tutorial](https://github.com/boot-clj/boot#install) for help creating a new project.)
2. Start the REPL by bring up the Command Palette (cmd-shift-p) and select "Proto REPL: Toggle"
  * The REPL can also be started by using the [keyboard shortcuts documented below](#keybindings-and-events).

### Connecting to a Remote REPL

Proto REPL can connect to a remote Clojure process using [nREPL](https://github.com/clojure/tools.nrepl). Connect to the remote REPL by triggering the Command Palette (cmd-alt-p) and selecting "Proto REPL: Remote Nrepl Connection". Enter the host and port of the remote nREPL server and it will connect. The keybinding `ctrl-alt-, y` will also work.

### Starting a Self Hosted ClojureScript REPL

Proto REPL includes the ability to start a self hosted ClojureScript REPL. This is a REPL that runs inside of the Atom editor using ClojureScript. It's currently fairly limited in its capabilities but it will continue to be improved in the future. The ability to run a REPL inside Atom will make it easier to use Proto REPL to develop Proto REPL itself and write more of Proto REPL's code in ClojureScript. It also removes the need to have Java or any build system like Leiningen or Boot installed to do basic things.

Start the self hosted REPL by triggering the Command Palette and selecting "Proto REPL: Start Self Hosted Repl". The keybinding `ctrl-alt-, j` will also work.

This is a list of the features currently supported in the self hosted REPL.

* Executing commands in the REPL.
* Executing blocks or selections of code.
* Autocompletion of vars (does not include documentation yet)
* Using [Proto REPL Charts](https://github.com/jasongilman/proto-repl-charts) to draw charts and graphs.
* Inline display of results
* Showing documentation of a var.
* Automatic evaluation mode.

This is a list of features currently _not_ yet supported in the self hosted REPL.

* Loading external files.
* Saving and displaying captured values
* Interrupting long running commands.
* Printing var source code.
* Opening the definition of a var.
* Running tests.

### Usage Outside of Leiningen Projects

Proto REPL can still start a REPL outside of a Leiningen project. It still uses Leiningen to start the REPL but uses a default project shipped with Proto REPL. This allows you to easily open up any Clojure file or even just a new Atom window and kick off a new REPL for experimenting.

### Typing in the REPL

Code to be executed in the REPL can be entered by typing in the last entry area. Code can be executed by pressing `shift+enter`. The REPL maintains a history of executed commands that were entered in the REPL. The history can be navigated by using the up and down arrow keys after placing the cursor in the text entry area.

### Sending Code to the REPL

Code can be sent to the REPL from within the REPL itself or any other open text editor. For example if you have some Clojure code in a Markdown file that can be sent to the REPL as well.

#### Sending a Block

A block of Clojure code is code that's delimited by parentheses `()`, curly braces `{}` (defines a map literal in Clojure), or square brackets `[]` (defines a vector literal in Clojure). The key binding `ctrl-alt-, b` (Press ctrl and comma together, release, then press b) can be used to send a block from the current text editor. The block that is sent depends on the position of the cursor. The cursor may be located nested inside several blocks, directly after a block, or before a block. The logic for block finding searches for blocks in the following order.

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

An arbitrary set of selected Clojure code can be sent to the REPL by selecting the code and using the key binding `ctrl-alt-, s` (Press ctrl and comma together, release, then press s). This allows sending multiple blocks of code at once.

### Autocompletion

Proto REPL supports completing of namespaces, vars, functions, local bindings, and Java methods using the [Compliment](https://github.com/alexander-yakushev/compliment) library. Make sure your project includes [![Clojars Project](https://img.shields.io/clojars/v/proto-repl.svg)](https://clojars.org/proto-repl) as a dependency.

Tips

* REPL must be started
* After modifying the required namespace definition reevaluate it so that Complement will be able to pick up the alias changes.

#### Completing Namespaces

![completing namespaces](https://github.com/jasongilman/proto-repl/raw/master/images/completion_namespaces.png)

#### Completing Functions

![completing functions](https://github.com/jasongilman/proto-repl/raw/master/images/completion_functions.png)

#### Completing Java Methods

![completing Java](https://github.com/jasongilman/proto-repl/raw/master/images/completion_java.png)

### Inline Results Display

Inline display of executed blocks or selections is supported if you have the [Atom Ink](https://github.com/JunoLab/atom-ink) package installed. You can disable inline results through the configuration. The values displayed inline are shown in a tree like view that lets you explore large nested data structures without having to view all of the data.

![inline results screenshot](https://github.com/jasongilman/proto-repl/raw/master/images/inline_results.gif)

### Automatic Evaluation Mode

(Automatic Evaluation is in beta and subject to change. [Please report any issues or suggestions for improvement](https://github.com/jasongilman/proto-repl/issues).)

Proto REPL supports the automatic evaluation of top level forms as you type. The results are displayed inline next to each top level form. This requires [Atom Ink](https://github.com/JunoLab/atom-ink) to be installed. Automatic Evaluation Mode can be started for a file by toggling the Atom Command Palette (cmd-alt-p) and selecting "Proto Repl: Autoeval File". It can be stopped by toggling the Atom Command Palette (cmd-alt-p) and selecting "Proto Repl: Stop Autoeval File"

![automatic evaluation mode screenshot](https://github.com/jasongilman/proto-repl/raw/master/images/autoeval.gif)

The visualization shown was created with [Proto REPL Charts](https://atom.io/packages/proto-repl-charts).

### Saving and Viewing Local Binding Values

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

The following code was the same as before but now it has `(proto-repl.saved-values/save 1)`. The `proto-repl.saved-values/save` function saves all the local bindings so that they can be viewed in Proto REPL. The `1` in `(proto-repl.saved-values/save 1)` is just a unique id to tie the saved values back to Proto REPL for display.

```Clojure
(reduce (fn [m [a b]]
         (proto-repl.saved-values/save 1)
         (update m a #(+ b (or % 0))))
       {}
       [[:apples 2] [:oranges 3] [:apples 4] [:cherries 7]])
=>
{:apples 6, :oranges 3, :cherries 7}
```

After running the code invoking the command `proto-repl:display-saved-value` will display the values in a table. Each row in the table represents a different iteration of the function.

![saved values table](https://github.com/jasongilman/proto-repl/raw/master/images/saved_values_table.png)

Tables are limited in the amount of detail that can be shown. Proto REPL will truncate long Clojure data structures to fit into a column. Each row of the table can be expanded to explore the details of large data structures.

![saved values table expanded](https://github.com/jasongilman/proto-repl/raw/master/images/saved_values_table_expanded.png)

You can also specify specific bindings to save. For example `(proto-repl.saved-values/save 1 m a)` will save just the values of local variables `m` and `b`.

#### The Def button - Defining vars for saved local bindings

The "def" button shown in the saved values table allows you to temporarily define vars in the namespace with names the same as the local bindings. This makes it easy to try out the code with the values that were saved. You can easily reevaluate bits of the code in place and all of the local bindings will be available for use.

#### Using the save value feature

1. Insert a call to `proto-repl.saved-values/save` in the code using the keybinding `ctrl-alt-shift-, i` (Press ctrl shift comma together, release then i) This just inserts the save call with a unique number. The unique number allows you to have multiple save calls in different locations within your code.
2. Execute your code. If you've placed the code in a function or across multiple namespaces you'll need to redefine the modified code or refresh before executing the code.
3. Show the values by pressing the keybinding `ctrl-alt-shift-, d`
4. Saved values can be cleared with the keybinding `ctrl-alt-shift-, c`

There's currently a limit of 20 saved values in proto-repl-lib. After debugging any issues make sure to remove the save calls. They're meant to be used in local development only.

## Dependencies

* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
  * Not required for self hosted REPL.
* [Leiningen](http://leiningen.org) or [Boot](https://github.com/boot-clj/boot)
  * Not required for self hosted REPL.
* [Atom Ink](https://atom.io/packages/ink)
  * This is an optional feature but many of Proto REPL's advanced features won't work without it.
* Add a dependency to the Clojure proto-repl-lib in your project's dependencies. [![Clojars Project](https://img.shields.io/clojars/v/proto-repl.svg)](https://clojars.org/proto-repl)
  * This is an optional Clojure library that adds support for some of the advanced Proto REPL features.
  * Required for:
    * Saving and displaying local binding values
    * Autocompleting Clojure code

Supports Clojure 1.6 and greater.

### Tool Bar Integration

Proto REPL integrates with the [Atom Tool Bar package](https://atom.io/packages/tool-bar) to provide buttons for common REPL actions. Install tool-bar and then restart Proto REPL to get quick access to actions like refreshing namespaces, pretty printing, and toggling REPL scrolling.

## Questions and Discussion

For questions and general Proto REPL discussion see the [#protorepl channel](https://clojurians.slack.com/messages/protorepl/) on [Slack](http://clojurians.net/)

## Extending Proto REPL

See [extending_proto_repl.md](https://github.com/jasongilman/proto-repl/blob/master/extending_proto_repl.md)

## Keybindings and Events

Keyboard shortcuts below refer to using `ctrl-alt-,` then a letter. That means press the `ctrl` key and the comma key at the same time, release them, and then press the subsequent letter. Some keyboard shortcuts also include the shift key.

| Keybinding           | Event                                 | Action                                                                                                                                   |
|----------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `ctrl-alt-, L`       | `proto-repl:toggle`                   | Starts the REPL                                                                                                                          |
| `ctrl-alt-, shift-L` | `proto-repl:toggle`                   | Starts the REPL using the current open project.clj                                                                                       |
| `ctrl-alt-, y`       | `proto-repl:remote-nrepl-connection`  | Connects to a remote nREPL session.                                                                                                      |
| `ctrl-alt-, j`       | `proto-repl:start-self-hosted-repl`   | Starts a self hosted REPL.                                                                                                               |
| `ctrl-alt-, e`       | `proto-repl:exit-repl`                | Exits the REPL                                                                                                                           |
| `ctrl-alt-, k`       | `proto-repl:clear-repl`               | Clears REPL Output                                                                                                                       |
| `ctrl-alt-shift-, s` | `proto-repl:toggle-auto-scroll`       | Enables/Disables autoscrolling the REPL                                                                                                  |
| `ctrl-alt-, b`       | `proto-repl:execute-block`            | Sends the current block of Clojure code to the REPL for execution.                                                                       |
| `ctrl-alt-, B`       | `proto-repl:execute-top-block`        | Sends the current top-level block of Clojure code to the REPL for execution.                                                             |
| `ctrl-alt-, s`       | `proto-repl:execute-selected-text`    | Sends the selected text to the REPL for execution.                                                                                       |
| `ctrl-alt-, f`       | `proto-repl:load-current-file`        | Loads the current file in the repl.                                                                                                      |
| `ctrl-alt-, r`       | `proto-repl:refresh-namespaces`       | Runs the `user/reset` function. See [My Clojure Workflow, Reloaded](http://thinkrelevance.com/blog/2013/06/04/clojure-workflow-reloaded) |
| `ctrl-alt-shift-, r` | `proto-repl:super-refresh-namespaces` | Clears all loaded namespaces using `clojure.tools.namespace` the runs the `user/reset` function.                                         |
| `ctrl-alt-, p`       | `proto-repl:pretty-print`             | Pretty prints the last value returned at the REPL.                                                                                       |
| `ctrl-alt-, x`       | `proto-repl:run-tests-in-namespace`   | Runs all the tests in the current namespace.                                                                                             |
| `ctrl-alt-, t`       | `proto-repl:run-test-under-cursor`    | Runs the test that has a name under the cursor.                                                                                          |
| `ctrl-alt-, a`       | `proto-repl:run-all-tests`            | Runs all the test in the current project.                                                                                                |
| `ctrl-alt-, d`       | `proto-repl:print-var-documentation`  | Prints the documentation of a var under the cursor.                                                                                      |
| `ctrl-alt-, c`       | `proto-repl:print-var-code`           | Prints out the code of the var under the cursor.                                                                                         |
| `ctrl-alt-, o`       | `proto-repl:open-file-containing-var` | Opens the code of the var or namespace under the cursor. This works even with vars defined in libraries.                                 |
| `ctrl-alt-, n`       | `proto-repl:list-ns-vars`             | Lists the vars in the namespace under the cursor.                                                                                        |
| `ctrl-alt-shift-, n` | `proto-repl:list-ns-vars-with-docs`   | Lists the vars in the namespace under the cursor with documentation.                                                                     |
| `shift-ctrl-c`       | `proto-repl:interrupt`                | Attempts to interrupt the currently running command in the REPL.                                                                         |
| `ctrl-alt-shift-, i` | `proto-repl:insert-save-value-call`   | Inserts a call to `proto/save` with a unique id                                                                                          |
| `ctrl-alt-shift-, d` | `proto-repl:display-saved-values`     | Displays values saved using the `proto/save` function.                                                                                   |
| `ctrl-alt-shift-, c` | `proto-repl:clear-saved-values`       | Clears previously saved values using the `proto/save` function.                                                                          |
