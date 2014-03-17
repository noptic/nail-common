injector
========
Definitions
-----------

    should      = require 'should'
    nailCore    = require 'nail-core'
    common      = require '../coverage/instrument/lib/module.js'
    _           = require 'underscore'
    nail        = nailCore.use common.fields,common.properties,
                  common.methods, common.injector

Description
-----------
All classes created with Injector accept an object as first constructor
argument. The fields of this object are copiedinto the new instance.
If a `init` method is defined it will be called with all arguments passed to
the constructor.

    describe 'injector', ->
      it 'is an Object', ->
        (_.isObject common.injector).should.be.ok

The injector sets the objects properties and fields:

      it 'injects filds and properties', ->
        lib = nail.to Person:
          properties:
            email:
              get: -> @_email
              set: (value)-> @_email = value
          fields:
            name: null

        dean = new lib.Person
          name:   'Dean'
          email:  'dean@example.com'
        dean.name.should.equal 'Dean'
        dean.email.should.equal 'dean@example.com'

After injecting the data the `init` method is called.

      it 'calls the init method', ->
        lib = nail.to Person:
          properties:
            email:
              get: -> @_email
              set: (value)-> @_email = value
          fields:
            name: null
          methods:
            init: -> @email = @email.toLowerCase() if _.isString @email

        dean = new lib.Person
          name:   'Dean'
          email:  'DEAN@ExAmPlE.com'

        dean.name.should.equal 'Dean'
        dean.email.should.equal 'dean@example.com'

All arguments are passed on to `init`.

      it 'passes arguments to init', ->
        lib = nail.to Thing:
          fields:
            name = null
          methods:
            init: (values, aNumber, aText)-> @stuff = "#{aNumber} and #{aText}"

        test = new lib.Thing {name: 'boxy'}, 12, 'five'

        test.name.should.equal 'boxy'
        test.stuff.should.equal '12 and five'

The first argument can be null.

      it 'is optional', ->
        lib = nail.to Thing:
          fields:
            name = null
          methods:
            init: (values, aNumber, aText)-> @stuff = "#{aNumber} and #{aText}"

        test = new lib.Thing null, 12, 'five'

        test.stuff.should.equal '12 and five'
