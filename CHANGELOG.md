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
