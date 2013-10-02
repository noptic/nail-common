init
====
Definitions
-----------

    should      = require 'should'
    common      = require ('../coverage/instrument/lib/module.js')
    _           = require 'underscore'
    nailCore    = require 'nail-core'
    nail        = nailCore.use common.init
    
Description
-----------

    describe 'init', ->
      it 'is an Object', ->
        (_.isObject common.init).should.be.ok
          
      it 'does not crash without a constructor', ->
        lib = nail.to Person: {}
        kira = new lib.Person
        
      it 'binds the constructor to the "init" method', ->
        lib = nail.to Person: {}
        lib.Person::init = (name) -> @name = name
        
        benjamin = new lib.Person 'Benjamin'
        benjamin.name.should.equal 'Benjamin'