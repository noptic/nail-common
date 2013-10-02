_ = require 'underscore'
module.exports.init =
  augment: (newClass) ->
    newClass::['GEN:constructor'] = @callInit
  callInit: ->
    @init?.apply this, arguments
    return @