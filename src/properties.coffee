module.exports.properties =
    aspect:    'properties'
    augment:  (newClass) ->
      properties = newClass.definition[@aspect] ? {}
      newClass::['GEN:get'] = @genGet
      newClass::['GEN:set'] = @genSet
      
      for name,value of properties
        @addProperty newClass, name, value
        
    addProperty: (target, name, value) ->
        target::[name] = value
        
    genGet: (name) -> @[name]
    genSet: (name, value) -> 
      @[name] =value
      return @