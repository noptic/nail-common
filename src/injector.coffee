module.exports.injector =
  augment: (newClass) ->
    newClass::['GEN:constructor'] = @inject
  inject: (properties) ->
    for name,value of properties
      @[name] = value
    return @