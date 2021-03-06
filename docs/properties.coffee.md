[coffee]: http://asmblah.github.com/coffee/
[glob]: https://npmjs.org/package/glob
[grunt-contrib-coffee]: https://github.com/gruntjs/grunt-contrib-coffee
[grunt-istanbul-coverage]: https://github.com/daniellmb/grunt-istanbul-coverage
[grunt-istanbul]: https://github.com/taichi/grunt-istanbul
[grunt-simple-mocha]: https://github.com/yaymukund/grunt-simple-mocha
[grunt]: http://gruntjs.com/
[mocha]: https://npmjs.org/package/mocha
[nail-core]: https://github.com/noptic/nail-core
[should]: https://github.com/visionmedia/should.js
[underscore]: http://underscorejs.org

[About]: About.coffee.md
[accessor]: accessor.coffee.md
[fields]: fields.coffee.md
[init]: init.coffee.md
[injector]: injector.coffee.md
[methods]: methods.coffee.md
[parent]: parent.coffee.md
[properties]: properties.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

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

The "aspect" field defines which section of the class definition
the module handles.

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

Initializing a property with a function creates readonly property

      it 'can be used as a nail module', ->
        nail = nailCore.use fields, properties
        lib = nail.to Rectangle:
          fields:
            length: 0
            height: 0
          properties:
            area: ->@length * @heigth

        x = new lib.Rectangle
        x.length = 2
        x.heigth = 3
        x.area.should.equal 6

An attemp to set a readonly property throws an error

      it 'throws an error on setting a readonly property', ->
        nail = nailCore.use fields, properties
        lib = nail.to Rectangle:
          fields:
            length: 0
            height: 0
          properties:
            area: ->@length * @heigth

        x = new lib.Rectangle
        (-> x.area = 2).should.throw(
          'Set error: Rectangle.area is a readonly property.'
        )
