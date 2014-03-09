module.exports.fields =
  aspect:    'fields'
  augment:  (newClass) ->
    fields = newClass.definition[@aspect] ? {}

    for name,value of fields
      @addProperty newClass, name, value

  addProperty: (target, name, value) ->
    target::[name] = value
