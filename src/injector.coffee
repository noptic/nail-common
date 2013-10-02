module.exports.injector = 
  augment: (newClass) ->
    newClass::['GEN:constructor'] = @inject
  inject: (properties) ->
    for name,value of properties
      @['GEN:set'] name, value
    return @