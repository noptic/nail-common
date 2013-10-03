_ = require 'underscore'

module.exports.accessor =
  aspect: 'properties'
  augment: (newClass) ->
    newClass::['GEN:set'] = @genSet 
    newClass::['GEN:get'] = @genGet
      
    if ! _.isUndefined newClass.definition[@aspect]
      escapedName = ''
      for name,defaultValue of newClass.definition[@aspect]
        newClass::[name] = @makeAccessor name;
        newClass::[@escapeName(name)] = defaultValue
    return @
    
  makeAccessor: (propertyName) ->
    escapedName = @escapeName propertyName
    return (newValue) ->
      if(arguments.length == 0)
        return @[escapedName]
      else
        @[escapedName] = newValue

  
  escapeName: (name) -> "_#{name}"
    
  genGet: (name) ->
    return @["_#{name}"]
  
  genSet: (name, value) ->
    @["_#{name}"] = value
    return @