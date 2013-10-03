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
[init]: init.coffee.md
[injector]: injector.coffee.md
[methods]: methods.coffee.md
[parent]: parent.coffee.md
[properties]: properties.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

methods
=======
Definitions
-----------

    should      = require 'should'
    nailCore    = require 'nail-core'
    methods     = require('../coverage/instrument/lib/module.js').methods
    _           = require 'underscore'
    they        = it #more natural language for describing array properties

Description
-----------

    describe 'methods', ->
      it 'is an Object', ->
        (_.isObject methods).should.be.ok

The "aspect" properties defines which section of the class definition the module handles.

      it 'has a "aspect" string"', ->
        methods.aspect.should.be.a 'string'
      
      it 'its aspect is "methods"', ->
        methods.aspect.should.equal 'methods'
        
This aspect is optional.      
      
      it 'does not crash if the class has no methods', ->
        Person = ->
        Person.definition = {}
        methods.augment Person

The augment function exists...

      it 'has a "augment" function', ->
        (_.isFunction methods.augment).should.be.ok

...and adds methods to the prototype.

      it 'adds a method to a class prototype', ->
        Person = ->
        Person.definition =
          methods:
            hello: -> 'hello world'
            
        methods.augment Person
        x = new Person
        x.hello().should.equal 'hello world'

The module can be used as a nail module.

      it 'can be used as a nail module', ->
        nail = nailCore.use methods
        lib = nail.to Person:
          methods:
            hello: -> 'hello world'
          
        x = new lib.Person
        x.hello().should.equal 'hello world'
