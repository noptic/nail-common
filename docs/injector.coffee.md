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

The first argument can be omitted.

      it 'is optional', ->
        lib = nail.to Thing:
          fields:
            name = null
          methods:
            init: (values, aNumber, aText)-> @stuff = "#{aNumber} and #{aText}"

        test = new lib.Thing null, 12, 'five'

        test.stuff.should.equal '12 and five'
