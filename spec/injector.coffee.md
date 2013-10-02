injector
========
Definitions
-----------

    should      = require 'should'
    nailCore    = require 'nail-core'
    common      = require '../coverage/instrument/lib/module.js'
    _           = require 'underscore'
    they        = it #more natural language for describing array properties
    nail        = nailCore.use common.properties, common.injector
    
Description
-----------

    describe 'injector', ->
      it 'is an Object', ->
        (_.isObject common.injector).should.be.ok
          
The injector sets the objects properties:
      
      it 'injects properties', ->
        lib = nail.to Person:
          name:   'anon'
          email:  null
          
        dean = new lib.Person
          name:   'Dean'
          email:  'dean@example.com'
          
        dean.name.should.equal 'Dean'
        dean.email.should.equal 'dean@example.com'
          