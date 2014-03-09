properties
==========
Definitions
-----------

    should      = require 'should'
    nailCore    = require 'nail-core'
    properties  = require('../coverage/instrument/lib/module.js').properties
    fields      = require('../coverage/instrument/lib/module.js').fields
    _           = require 'underscore'
    they        = it #more natural language for describing array properties

Description
-----------

    describe 'properties', ->
      it 'is an Object', ->
        (_.isObject properties).should.be.ok

The "aspect" properties defines which section of the class definition the module handles.

      it 'has a "aspect" string"', ->
        properties.aspect.should.be.a 'string'

      it 'its aspect is "properties"', ->
        properties.aspect.should.equal 'properties'

This aspect is optional.

      it 'does not crash if the class has no properties', ->
        Person = ->
        Person.definition = {}
        properties.augment Person

The augment function exists...

      it 'has a "augment" function', ->
        (_.isFunction properties.augment).should.be.ok

...and adds properties.

      it 'adds a property to a class prototype', ->
        Person = ->
        Person.definition =
          properties:
            name:
              get: -> @_name
              set: (newValue) -> @_name = newValue
        properties.augment Person
        x = new Person
        x.name = 'sam'
        x.name.should.equal 'sam'

The module can be used as a nail module.

      it 'can be used as a nail module', ->
        nail = nailCore.use fields, properties
        lib = nail.to Person:
          properties:
            name:
              get: -> @_name
              set: (newValue) -> @_name = newValue

        x = new lib.Person
        x.name = 'someone'
        x.name.should.equal 'someone'

Properties can be initialized wih `is`.

      it 'can be initialized wih `is`', ->
        nail = nailCore.use fields, properties
        lib = nail.to Person:
          properties:
            name:
              get: -> @_name
              set: (newValue) -> @_name = newValue
              is:  'anon'

        x = new lib.Person
        x.name.should.equal 'anon'

More than one property can be defined.

      it 'can create multiple properties', ->
        nail = nailCore.use properties

        lib = nail.to Person:
          properties:
            firstName:
              get: -> @_firstName
              set: (newValue) -> @_firstName = newValue
            lastName:
              get: -> @_lastName
              set: (newValue) -> @_lastName = newValue

        x = new lib.Person
        x.firstName = 'someone'
        x.lastName  = 'else'
        x.firstName.should.equal 'someone'
        x.lastName.should.equal  'else'
        console.log x

Values are stored per instance.

      it 'can be used with multiple instances', ->
        nail = nailCore.use fields, properties
        lib = nail.to Person:
          properties:
            name:
              get: -> @_name
              set: (newValue) -> @_name = newValue

        x = new lib.Person
        y = new lib.Person
        x.name = 'someone'
        y.name = 'thisone'
        x.name.should.equal 'someone'
        y.name.should.equal 'thisone'
