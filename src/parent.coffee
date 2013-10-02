_ = require 'underscore'

module.exports.parent =
  aspect: 'parent'
  augment: (newClass) ->
    if newClass.definition.parent
      switch typeof newClass.definition.parent
        when 'function' 
          newClass.prototype = new newClass.definition.parent
        when 'object' 
          newClass.prototype = newClass.definition.parent
        when 'string' 
          newClass.prototype = new newClass.nail.lib[newClass.definition.parent]