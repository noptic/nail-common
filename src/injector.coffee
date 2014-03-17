_ = require 'underscore'
module.exports.injector =
  augment: (newClass) ->
    newClass::['GEN:constructor'] = @inject
  inject: (properties) ->
    if properties
      for name,value of properties
        @[name] = value
    @init.apply(@, arguments) if _.isFunction @init
