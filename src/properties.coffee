_ = require 'underscore'
module.exports.properties =
  aspect:    'properties'
  augment:  (newClass) ->
    properties = newClass.definition[@aspect] ? {}

    for name,definition of properties
      @addProperty newClass, name, definition

  addProperty: (target, name, definition) ->
    Object.defineProperty target.prototype, name, {
      get: definition.get
      set: definition.set
    }
    if not _.isUndefined definition.is
      target.prototype[name] = definition.is