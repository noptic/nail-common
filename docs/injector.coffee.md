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
    they        = it #more natural language for describing array properties
    nail        = nailCore.use common.fields,common.properties, common.injector

Description
-----------

    describe 'injector', ->
      it 'is an Object', ->
        (_.isObject common.injector).should.be.ok

The injector sets the objects properties:

      it 'injects properties', ->
        lib = nail.to Person:
          fields:
            _name:   'anon'
            _email:  null
          properties:
            email:
              get: -> @_email
              set: (value)-> @_email = value
            name:
              get: -> @_name
              set: (value)-> @_name = value

        dean = new lib.Person
          name:   'Dean'
          email:  'dean@example.com'
        console.log dean
        dean.name.should.equal 'Dean'
        dean.email.should.equal 'dean@example.com'
