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

## 0.7.0

### New/Modified Features

* Added ability to extend Proto REPL with code execution extensions. See proto-repl.coffee for more information. This feature allows the addition of extensions that can be used to visualize results from the REPL.

## 0.7.1

### Bug Fixes

* Forcing upgrade of nrepl-client to latest on github so that the newer version of bencode will be used. The previous version was causing the REPL to periodically hang when retrieving large requests.

## 0.8.0

### New/Modified Features

* Support for [proto-repl-charts](https://github.com/jasongilman/proto-repl-charts).

## 0.8.1

### Bug Fixes

* Fixed issue with refreshing the REPL when there's a compile error. The problem is displayed in the REPL now.

## 0.8.2

### New/Modified Features

* Adding alpha level support for [Atom Ink](https://github.com/JunoLab/atom-ink). Install the Atom Ink package and enable inline results in the Proto REPL settings. Results will be displayed inline as well as in the REPL.

## 0.8.3

### Bug Fixes

* Fixed #25. File names with slashes can now be loaded into the REPL.

## 0.9.0

### New/Modified Features

* Major rewrite of the REPL output and interaction to make it behave more like a traditional REPL:
  * REPL allows entering commands to execute in an entry area at the bottom. The upper area of the REPL is can not be modified. `shift+enter` executes code in the entry area.(#24, #10)
  * The REPL supports a history of commands (#23)
  * Executed code is echo'd in the REPL display area (#26)

### Bug Fixes

* Detects when clojure.tools.namespace is not available and displays error message.

## 0.10.0

### New/Modified Features

* Added config option to automatically pretty print results at the REPL. Uses [fipp](https://github.com/brandonbloom/fipp)
* Improved inline display of Clojure results by pretty printing results as secondary tree level.
* Added inline display of documentation when inline is enabled.

### Bug Fixes

* Fixed requiring of clojure.repl when listing namespace contents.

## 0.10.1

### Bug Fixes

* Fixed issue with trying to pretty print certain REPL output.

## 0.10.3

### Bug Fixes

* Fixed issue with refreshing the repl during a compilation problem.

## 0.10.4

### Bug Fixes

* Fixed issue #31. Reader conditionals can be evaluated either by sending them from a block of code or entered at the REPL.
* Fixed issue #32. Added callback for refreshing code. Running all tests will be triggered after a successful refresh.

## 0.11.0

### New/Modified Features

* Fixed #19 -  A REPL can be started from a specific project.clj file instead of the root one by opening the project.clj and pressing keyboard shortcut ctl-, shift-L (ctrl and comma together, release, then shift and L).

## 0.11.1

### Bug Fixes

* Fixed #34. Was not correctly setting the namespace when evaluating blocks and selections.

## 0.12.0

### New/Modified Features

* Fixed #36. Added option to refresh on REPL startup.
* Adding Autoloading of the current file as part of more experimental tests of inline results.

## 0.12.1

### Bug Fixes

* Updated for atom ink version 0.3.1

## 0.12.2

### Bug Fixes

* Fixed #41 Made Proto REPL detect if it was on pre-1.7 version of Clojure to use a different read-string call.

## 0.13.0

### New/Modified Features

* Fixed #17 - Added ability to connect to a remote nREPL. Thanks to [@geksilla](https://github.com/jasongilman/proto-repl/pull/45)
* Tweaking auto evaluation mode so that it doesn't display a marker and it correctly clears Atom ink inline results
* Taking inline mode out of beta.

## 0.14.0

### New/Modified Features

* Added updated implementation of displaying inline values from the REPL. The values are converted into a displayable tree where each child part can be expanded.
