module.exports.methods =
    aspect:    'methods'
    augment:  (newClass) ->
      methods = newClass.definition[@aspect] ? {}
      
      for name,value of methods
        @addMethod newClass, name, value
        
    addMethod: (target, name, value) ->
        target::[name] = value
    