# {$, $$$, ScrollView} = require 'atom-space-pen-views'
{ScrollView} = require 'atom-space-pen-views'

module.exports = 
class ReplScrollView extends ScrollView
  @content: ->
    @div "Hello World"