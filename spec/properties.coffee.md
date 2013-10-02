properties
==========
Definitions
-----------

    should      = require 'should'
    nailCore    = require 'nail-core'
    properties  = require('../coverage/instrument/lib/module.js').properties
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

...and adds properties to the prototype.

      it 'adds a property to a class prototype', ->
        Person = ->
        Person.definition =
          properties:
            name: 'anon'
            
        properties.augment Person
        x = new Person
        x.name.should.equal 'anon'

The module can be used as a nail module.

      it 'can be used as a nail module', ->
        nail = nailCore.use properties
        lib = nail.to Person:
          properties:
            name: 'anon'
          
        x = new lib.Person
        x.name.should.equal 'anon'
            
And supports generic commands.

      describe 'supports the generic commands', ->
        nail = nailCore.use properties
        lib = nail.to Person:
          properties:
            name: 'anon'
          
        x = new lib.Person
        
        it 'GEN:set', ->
          x['GEN:set'] 'name', 'whatever'
          x.name.should.equal 'whatever'
          
        it 'GEN:get', ->
          x.name = 'blub'
          x['GEN:get']('name').should.equal 'blub'
      
          