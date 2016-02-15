# Save and Recall Feature

Completed today

* Figured out how to style with mono-space to make it look like a table
* Came up with example table
* Figured out how to expand the stuff
* Figured out for future how to highlight the code in the inline view like Clojure
* Came up with algorithm to layout the table within a size.
* Started implementing it

Questions

* Sometimes I care about the latest value and sometimes I care about the order they were calculated in. The new design puts them in order of execution. It's probably ok. Latest is at the bottom.


## Left to do

### First Version

* Clojure side
  * Allow specifying particular vars to save instead of everything.
  * Push proto repl library to clojars
* Towards end
  * Test everything
  * Document the Feature

### Next

* Clojure side
  * Track separate save locations using only the id
  * Keep track of version of saved data per uniq id
* Proto REPL Side
  * Every time the values are fetched and redisplayed the map is collapsed.
    * Need to track the result and then update the view inside it or remember the state of collapsed/not collapsed
  * Send version when fetching.
  * Determine best polling interval (every second)
  * Use Highlights (https://github.com/atom/highlights) to provide syntax highlighting in inline views.
* Towards end
  * Testing
  * Update feature documentation
  * Move gifs to the github cloud cdn instead of in repo

## Future Ideas

### Allow display in a simple table

The `save` call can specify display instructions

```
(save 111 :table)
```

Then the display would show each value in a simple table.
