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
    parent     = require('../coverage/instrument/lib/module.js').parent
    _           = require 'underscore'

Description
-----------

    describe 'parent', ->
      it 'is an Object', ->
        (_.isObject parent).should.be.ok

The "aspect" properties defines which section of the class definition the module handles.

      it 'has a "aspect" string"', ->
        parent.aspect.should.be.a 'string'
      
      it 'its aspect is "parent"', ->
        parent.aspect.should.equal 'parent'
        
This aspect is optional.      
      
      it 'does not crash if the class has no parent', ->
        Person = ->
        Person.definition = {}
        parent.augment Person

The augment function exists...

      it 'has a "augment" function', ->
        (_.isFunction parent.augment).should.be.ok


The module can be used as a nail module.

      it 'can be used as a nail module', ->
        nail = nailCore.use parent
        parentClass = ->
        
        lib = nail.to User:
          parent: parentClass
          
        x = new lib.User
        (x instanceof parentClass).should.be.ok
        
...and creates a prototype chain.

      describe 'creates a prototype chain', ->
      
The parent can be an constructor function. 
The function will be called without parameters (`new constructor()`) to create 
the prototype.

        it 'with a constructor', ->
          Person  = ->
          User    = ->
          User.definition =
            parent: Person
          
          parent.augment User
          x = new User
          (x instanceof Person).should.be.ok

The parent can be an object. The object is used as the classes prototype.

        it 'with a object', ->
          Person  = ->
          User    = ->
          
          User.definition =
            parent: new Person()
          
          parent.augment User
          x = new User
          (x instanceof Person).should.be.ok


Or a string. The string must be an fully qualified class name.

        it 'with a string', ->
          nailCore.lib['nail-common.Person'] = ->
          User    = ->
          User.definition =
            parent: 'nail-common.Person'
          User.nail = nailCore
          parent.augment User
          x = new User
          
          (x instanceof nailCore.lib['nail-common.Person']).should.be.ok
          nailCore.lib['nail-common.Person'] = undefined
          