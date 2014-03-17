_ = require 'underscore'
module.exports.properties =
  aspect:    'properties'
  augment:  (newClass) ->
    properties = newClass.definition[@aspect] ? {}

    for name,definition of properties
      @addProperty newClass, name, definition

  addProperty: (target, name, definition) ->
    delete target::[name]
    if _.isFunction definition
      definition = get: definition
    if _.isUndefined definition.set
      definition.set = @createWriteErrorFunction name
    Object.defineProperty target.prototype, name, {
      get: definition.get
      set: definition.set
    }
    if not _.isUndefined definition.is
      target.prototype[name] = definition.is

  createWriteErrorFunction: (propertyName) ->
    ->
      realClass = @constructor.className
      throw new Error (
        "Set error: #{realClass}.#{propertyName} is a readonly property."
      )