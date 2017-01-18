# 1.4.13

* Fixed #220 - Updating package.json to handle newer tool bar versions.

# 1.4.12

* Fixed #217 - Open var on windows does not work.

# 1.4.11

* Fixed #214 - Code copied from the REPL no longer has non-breaking spaces.
* Fixed #203 - Opening a var in a directory containing a space now works.

# 1.4.10

* Fixed #169 - Adding check when receiving a connection error if we're still connected.
* Fixed #195 - Code entered at REPL is not left in if displayExecutedCodeInRepl is disabled.

# 1.4.9

* Added ability to execute the var under cursor using the execute-selected-text event. If nothing is selected it will look for a Clojure var under the cursor to evaluate and display the value of.
* Fixed #163 - REPL results can be selected and copied.
* Default Atom auto completion will still work even if REPL not running or compliment not present

# 1.4.8

* Fixing #166 - Moving definition of `processData`
* Fixing #167 - Changing node.js call to allow startup on windows.
* Fixing #171 - Updating proto repl to work with Atom 1.12.
* Defaulting nREPL remote connection port to port number specified in .nrepl-port file. Thanks to @mauricioszabo

# 1.4.7

* Fixed #155 - Correcting issues with inline display after Atom update.
* Fixed #148 - Updating completions provider so it will work with Atom Ink Console.

# 1.4.5, 1.4.6

* Fixed #154 - missing dependency
* Partial fix for inline views with the latest ink.

# 1.4.4

* Fixed #136 - Moved highlights from external node dependency to explicitly bundled dependency skipping some of the unused dependencies. This fixes a problem with using oniguruma on windows.

# 1.4.3

* Adding loading indicator. Thanks to Camilo Roca.
* Fixed #142 - Run all tests doesn't work when Ink Console is selected.
* Added callbacks for some Proto REPL events.

# 1.4.2

* Fixed #137 - REPL was not working if Atom Ink wasn't installed.

# 1.4.1

* Fixing several problems with the new Atom Ink Console usage.
  * Updating REPL instructions.
  * Fixing sizing of result output.
  * Fixing REPL history.

# 1.4.0

* Added Ink Console for use as the default REPL output. Thanks to Camilo Roca for the prototyping and initial implementation.
* Fixed #133 - Namespace changing incorrectly back to user.

# 1.3.4

* Fixed #129 - saved values correctly captures the namespace.

# 1.3.1 to 1.3.3

* Updating library versions used in the default leiningen project so it uses the new Proto REPL library and other miscellaneous problems with the default leiningen project.

# 1.3.0

* Added def buttons to the inline saved values.

# 1.2.1

* #111 - Made small changes to error message in refresh.

# 1.2.0

* Added new extensions feature. This allows Proto REPL extensions to communicate with Proto REPL using a backchannel. Proto REPL Charts takes advantage of it for its new canvas drawing feature.

# 1.1.11

* #110 - Fixed problem with starting Proto REPL default project REPL when Atom is running in dev mode.
* #102 - Added "proto-repl-repl" class to the text editor to allow custom styling. Added option to allow opening REPL in right pane or current pane.

# 1.1.10

* #56 - Changing keybindings from ctrl-, initiator to ctrl-alt-, to avoid preferences conflict. Leaving the old ones in place to avoid breaking existing users workflows.

# 1.1.9

* #98 - Fixing error loading with Atom Ink.
* #94 - Fixed display of documentation in the REPL.

# 1.1.8

* #91 - Fixing Remote REPL connection error handling

# 1.1.7

* #89 - Allowing other completion providers to work with Proto REPL.

# 1.1.6

* #69 - Improving performance of tree view display.
* #69, #77 - Changing pretty printing to be off by default. You can reenable pretty printing by default in the settings or use `cmd-, p` to pretty print the results.
  * The automatic pretty printing didn't perform as well as I would like and wouldn't correctly display values for certain Clojure types. Pretty printing through `cmd-, p` uses the Clojure REPL to pretty print the results so it's correctly displayed.

## 1.1.5

* Test change for Atom 1.7.

## 1.1.4

* Fixed #78 refreshing of code so it doesn't fail when user namespace is not available.


## 1.1.3

* Fixed issue in refresh handler that would cause it not to run all tests or not print refresh had completed.
* Added try catch to result handlers to help avoid cases where the REPL would stop working.

## 1.1.2

* Changing how Proto REPL tracks namespaces of the current REPL. Fixed issue where the repl was stuck after changing the namespace.

## 1.1.1

* Fixing proto repl packaging problem

## 1.1.0

* Added self hosted ClojureScript REPL.

## 1.0.3

* Changed boot startup so that it will use the dev profile.

## 1.0.2

### Bug fixes

* Changed some default settings to be better for new developers.
* Fixed #75 - REPL will keep track of the current namespace now.

## 1.0.1

### New Features

* Added jsToEdn function for plugins to use.

## 1.0.0

Accidentally published as major instead of minor but oh well! Now is as good a time as any to say it's at 1.0.0.

### New Features

* Added preference option to choose leiningen or boot if both build files are present.
* Fixed #38 - Changed all commands that rely on selecting the full name for something to work if you just place your cursor on that name.

## 0.17.0

### New Features

* Added boot support.
* Changed to not display results inline or in repl when an execution extension is triggered.
* Updating default lein project to include latest version of proto repl charts.

## 0.16.2

### Bug Fixes

* Added more menu commands for opening the REPL from an open project.clj.

## 0.16.1

### Bug Fixes

* Fixed #68 - Avoids trying to find a project.clj if project folder is within "atom://.." directory.

## 0.16.0

### Enhancements

* Fixed #28. Added autocompletion support using Complement.

## 0.15.2

### Bug Fixes

* Fixed #62 so that if the REPL is closed before the process has fully finished starting a new REPL can be opened.
* Fixed #63. Braces in regular expressions are now ignored when searching for s-expressions.
* Fixed #65. Added refresh call before running a single test file or a single test. This can be disabled through the Proto REPL settings.

## 0.15.1

### Bug Fixes

* Improvements to the display portion of save and display of local bindings.

## 0.15.0

### Enhancements

* Fixed #51 - Proto REPL will now recursively search upwards for a project.clj file if it is opened in a subdirectory of a project.
* Added new feature for saving and displaying the values of local bindings. See https://github.com/jasongilman/proto-repl#saving-and-viewing-local-binding-values

## 0.14.1

### Bug Fixes

* Fixed #57 - a problem where the REPL displayed everything twice when cider-nrepl middleware was included.
* Adding atom ink to the list of package dependencies.
* Fixed #13 (again) Fixed startup issues on Windows.


## 0.14.0

### New/Modified Features

* Added updated implementation of displaying inline values from the REPL. The values are converted into a displayable tree where each child part can be expanded.
* Fixed #37 Selecting and opening a namespace alias now works.

### Bug Fixes

* Fixed an issue where if there was lots of standard output the returned value wouldn't be printed in the correct position within the output. This caused tests that produced lots of output to hide their results somewhere in the middle of the output.
* Fixed #50 with temporary change to a forked version of node-nrepl-client (jg-nrepl-client) that is published on npm.
* Fixed #43 opening files using internal Atom APIs instead of shelling out.

## 0.13.0

### New/Modified Features

* Fixed #17 - Added ability to connect to a remote nREPL. Thanks to [@geksilla](https://github.com/jasongilman/proto-repl/pull/45)
* Tweaking auto evaluation mode so that it doesn't display a marker and it correctly clears Atom ink inline results
* Taking inline mode out of beta.


## 0.12.2

### Bug Fixes

* Fixed #41 Made Proto REPL detect if it was on pre-1.7 version of Clojure to use a different read-string call.

## 0.12.1

### Bug Fixes

* Updated for atom ink version 0.3.1

## 0.12.0

### New/Modified Features

* Fixed #36. Added option to refresh on REPL startup.
* Adding Autoloading of the current file as part of more experimental tests of inline results.

## 0.11.1

### Bug Fixes

* Fixed #34. Was not correctly setting the namespace when evaluating blocks and selections.

## 0.11.0

### New/Modified Features

* Fixed #19 -  A REPL can be started from a specific project.clj file instead of the root one by opening the project.clj and pressing keyboard shortcut ctl-, shift-L (ctrl and comma together, release, then shift and L).

## 0.10.4

### Bug Fixes

* Fixed issue #31. Reader conditionals can be evaluated either by sending them from a block of code or entered at the REPL.
* Fixed issue #32. Added callback for refreshing code. Running all tests will be triggered after a successful refresh.

## 0.10.3

### Bug Fixes

* Fixed issue with refreshing the repl during a compilation problem.

## 0.10.1

### Bug Fixes

* Fixed issue with trying to pretty print certain REPL output.

## 0.10.0

### New/Modified Features

* Added config option to automatically pretty print results at the REPL. Uses [fipp](https://github.com/brandonbloom/fipp)
* Improved inline display of Clojure results by pretty printing results as secondary tree level.
* Added inline display of documentation when inline is enabled.

### Bug Fixes

* Fixed requiring of clojure.repl when listing namespace contents.

## 0.9.0

### New/Modified Features

* Major rewrite of the REPL output and interaction to make it behave more like a traditional REPL:
  * REPL allows entering commands to execute in an entry area at the bottom. The upper area of the REPL is can not be modified. `shift+enter` executes code in the entry area.(#24, #10)
  * The REPL supports a history of commands (#23)
  * Executed code is echo'd in the REPL display area (#26)

### Bug Fixes

* Detects when clojure.tools.namespace is not available and displays error message.

## 0.8.3

### Bug Fixes

* Fixed #25. File names with slashes can now be loaded into the REPL.

## 0.8.2

### New/Modified Features

* Adding alpha level support for [Atom Ink](https://github.com/JunoLab/atom-ink). Install the Atom Ink package and enable inline results in the Proto REPL settings. Results will be displayed inline as well as in the REPL.

## 0.8.1

### Bug Fixes

* Fixed issue with refreshing the REPL when there's a compile error. The problem is displayed in the REPL now.

## 0.8.0

### New/Modified Features

* Support for [proto-repl-charts](https://github.com/jasongilman/proto-repl-charts).


## 0.7.1

### Bug Fixes

* Forcing upgrade of nrepl-client to latest on github so that the newer version of bencode will be used. The previous version was causing the REPL to periodically hang when retrieving large requests.


## 0.7.0

### New/Modified Features

* Added ability to extend Proto REPL with code execution extensions. See proto-repl.coffee for more information. This feature allows the addition of extensions that can be used to visualize results from the REPL.

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

## 0.5.1

### Bug Fixes

* Fixed problem with using Proto REPL on Windows.

## 0.5.0

### Bug Fixes

* Changed exit REPL keybinding from `ctrl-d` to `ctrl-, e` to avoid conflicting with Vim plugin.

### New/Modified Features

* Added the ability to execute the outermost block. (Thanks [@qwtel](https://github.com/jasongilman/proto-repl/pull/11)!)

## 0.4.1

### Bug Fixes

* Corrected keybindings in REPL help text.

## 0.4.0

### New/Modified Features

* Added ability to start Proto REPL outside of a Leiningen project. It uses a default project bundled with Proto REPL in this case.

## 0.3.1

### Bug Fixes

* Fixing the way leiningen is started to address path issues.

## 0.3.0

### New/Modified Features
* Added `protoRepl` global var and changed `executeCodeInNs` to allow users to write their own commands that can send code to the REPL.
* Added new keybindings for almost every command that should work for Windows, Linux, and OSX.


## 0.2.2

### Bug Fixes
* Fixed [very first filed issue](https://github.com/jasongilman/proto-repl/issues/1). Executing blocks ignores parentheses, etc inside strings or comments.

## 0.2.1

### New/Modified Features
* Block execution can detect the beginning and end of a Markdown code section containing Clojure and execute all of the Clojure code in the Markdown.

### Bug Fixes
* Fixed bug where an exception would be received if sending code to a REPL that was closed.
* Fixed many of the helper capabilities like printing documentation and running tests. The should have been executed in the namespace of the current file.

## 0.2.0

### New/Modified Features
* Changed block execution so that it will work if cursor if placed directly before the opening of a block or after the closing of a block.
* Block execution temporarily highlights the area that was executed.

### Bug Fixes
* Fixed bug where once REPL was closed it could not be restarted without restarting Atom.

## 0.1.0 - First Release

* Every feature added
* Every bug fixed
