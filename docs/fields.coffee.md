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
    fields      = require('../coverage/instrument/lib/module.js').fields
    _           = require 'underscore'
    they        = it #more natural language for describing array properties

Description
-----------

    describe 'fields', ->
      it 'is an Object', ->
        (_.isObject fields).should.be.ok

The "aspect" defines which section of the class definition the module handles.

      it 'has a "aspect" string"', ->
        fields.aspect.should.be.a 'string'

      it 'its aspect is "fields"', ->
        fields.aspect.should.equal 'fields'

This aspect is optional.

      it 'does not crash if the class has no fields', ->
        Person = ->
        Person.definition = {}
        fields.augment Person

The augment function exists...

      it 'has a "augment" function', ->
        (_.isFunction fields.augment).should.be.ok

...and adds fields to the prototype.

      it 'adds a field to a class prototype', ->
        Person = ->
        Person.definition =
          fields:
            name: 'anon'

        fields.augment Person
        x = new Person
        x.name.should.equal 'anon'

The module can be used as a nail module.

      it 'can be used as a nail module', ->
        nail = nailCore.use fields
        lib = nail.to Person:
          fields:
            name: 'anon'

        x = new lib.Person
        x.name.should.equal 'anon'