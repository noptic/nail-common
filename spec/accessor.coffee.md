accessor
========
Definitions
-----------

    should      = require 'should'
    common      = require ('../coverage/instrument/lib/module.js')
    accessor    = common.accessor
    _           = require 'underscore'
    nailCore    = require 'nail-core'
    nail        = nailCore.use accessor
    they        = it
    
Description
-----------

    describe 'accesor', ->
      
      it 'is an Object', ->
        (_.isObject common.accessor).should.be.ok

      it 'implements "augment"', ->
        _.isFunction(common.accessor.augment).should.be.ok

The "aspect" properties defines which section of the class definition the module handles.

      it 'has a "aspect" string"', ->
        accessor.aspect.should.be.a 'string'
      
      it 'its aspect is "properties"', ->
        accessor.aspect.should.equal 'properties'
        
This aspect is optional.      
      
      it 'does not crash if the class has no properties', ->
        Person = ->
        Person.definition = {}
        accessor.augment Person
    
For each function a accesor method is created
      
      describe 'functions', ->
        lib = nail.to Person:
          properties:
            firstName: 'anon'
            lastName:   null
        
        they 'are created', ->
          dalia = new lib.Person
          (_.isFunction dalia.firstName).should.be.ok  
          (_.isFunction dalia.lastName).should.be.ok  
        
        they 'set property values', ->
          dalia = new lib.Person
          dalia.firstName 'Dalia'
          dalia.lastName '???'
          dalia._firstName.should.equal 'Dalia'
          dalia._lastName.should.equal '???'
          
        they 'get property values', ->
          x = new lib.Person
          x._firstName = 'x'
          x._lastName = 'y'
          x.firstName().should.equal 'x'
          x.lastName().should.equal 'y'
        
         they 'support GEN:set', ->
          dalia = new lib.Person
          dalia['GEN:set'] 'firstName','Dalia'
          dalia['GEN:set'] 'lastName','???'
          dalia._firstName.should.equal 'Dalia'
          dalia._lastName.should.equal '???'
          
        they 'support GEN:get', ->
          x = new lib.Person
          x._firstName = 'x'
          x._lastName = 'y'
          x['GEN:get']('firstName').should.equal 'x'
          x['GEN:get']('lastName').should.equal 'y'
        
        