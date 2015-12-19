## 0.1.0 - First Release

* Every feature added
* Every bug fixed

## 0.2.0

### New/Modified Features
* Changed block execution so that it will work if cursor if placed directly before the opening of a block or after the closing of a block.
* Block execution temporarily highlights the area that was executed.

### Bug Fixes
* Fixed bug where once REPL was closed it could not be restarted without restarting Atom.

## 0.2.1

### New/Modified Features
* Block execution can detect the beginning and end of a Markdown code section containing Clojure and execute all of the Clojure code in the Markdown.

### Bug Fixes
* Fixed bug where an exception would be received if sending code to a REPL that was closed.
* Fixed many of the helper capabilities like printing documentation and running tests. The should have been executed in the namespace of the current file.

## 0.2.2

### Bug Fixes
* Fixed [very first filed issue](https://github.com/jasongilman/proto-repl/issues/1). Executing blocks ignores parentheses, etc inside strings or comments.

## 0.3.0

### New/Modified Features
* Added `protoRepl` global var and changed `executeCodeInNs` to allow users to write their own commands that can send code to the REPL.
* Added new keybindings for almost every command that should work for Windows, Linux, and OSX.

## 0.3.1

### Bug Fixes

* Fixing the way leiningen is started to address path issues.

## 0.4.0

### New/Modified Features

* Added ability to start Proto REPL outside of a Leiningen project. It uses a default project bundled with Proto REPL in this case.

## 0.4.1

### Bug Fixes

* Corrected keybindings in REPL help text.

## 0.5.0

### Bug Fixes

* Changed exit REPL keybinding from `ctrl-d` to `ctrl-, e` to avoid conflicting with Vim plugin.

### New/Modified Features

* Added the ability to execute the outermost block. (Thanks [@qwtel](https://github.com/jasongilman/proto-repl/pull/11)!)


## 0.5.1

### Bug Fixes

* Fixed problem with using Proto REPL on Windows.

## 0.6.0

### Bug Fixes

* Corrected process shutdown when a REPL window is closed.
* Fixed issue that made the REPL tab title show "untitled"

### New/Modified Features

* Proto REPL now uses nREPL for all communication with the REPL process. This is a much more standard way to send code to the REPL.
  * Allows interrupting a very long running command or infinite loop. Use ctrl-shift-c to send the interrupt.
* Added an option to `protoRepl` public execution functions to capture the result of execution in a callback. Added a function for parsing the result. This will allow the creation of extension packages to Proto REPL such as visualizations.
* Added setting to disable Clojure syntax in REPL.
* Refresh all command prints output to the REPL when it starts. Useful for immediate feedback when used in large projects.
