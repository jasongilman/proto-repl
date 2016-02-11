# Save and Recall Feature

Left to do

* Clojure side
  * Track separate save locations using only the id
  * Keep track of version of saved data
    * What about doing a version per saved set? A: not necessary yet. Keep it simple
  * Put a limit on the number of distinct values we'll keep in memory (drop oldest)
  * Allow specifying particular vars to save instead of everything.
  * Put in a library (proto-repl)
* Proto REPL Side
  * Everytime the values are fetched and redisplayed the map is collapsed.
    * Try opening it expanded.
  * Send version when fetching.
  * Write command to insert save call with keybinding and unique id
  * Determine best polling interval (every second)
* Towards end
  * Document the Feature
  * Move gifs to the github cloud cdn instead of in repo
  *
