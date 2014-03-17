methods
=======
Definitions
-----------

    should    = require 'should'
    nailCore  = require 'nail-core'
    module    = require '../coverage/instrument/lib/module.js'
    parent    = module.parent
    _         = require 'underscore'

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

###Usage
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
          delete nailCore.lib['nail-common.Person']


###Inheritance and Overriding
The parents methods are inherited.
To demostrate this we will use the [methods] module.
It is imortant to load [methods] after parent.

      describe 'methods', ->
        nail = nailCore.use parent, module.methods

        it 'are inherited', ->
        nail.to 'nail-common',
          Person:
            methods:
              hello: -> 'hello world'
          User:
            parent: 'nail-common.Person'
            methods:
              bye: -> 'goodbye cruel world'

        user = new nail.lib['nail-common.User']

        user.hello().should.equal 'hello world'
        user.bye().should.equal 'goodbye cruel world'

        delete nail.lib['nail-common.Person']
        delete nail.lib['nail-common.User']

The new class can override the parents method.

        it 'can be overriden', ->
          lib = {}
          nail.to lib, 'nail-common',
            Person:
              methods:
                hello: -> 'hello world'
                bye: -> 'goodbye cruel world'
            User:
              parent: 'nail-common.Person'
              methods:
               hello: -> 'hello user'
          user = new lib.User
          user.hello().should.equal 'hello user'
          delete nail.lib['nail-common.Person']
          delete nail.lib['nail-common.User']

        it 'does not change the parent', ->
          nail = nailCore.use parent, module.methods
          lib = {}
          nail.to lib, 'nail-common',
            Person:
              methods:
                hello: -> 'hello world'
                bye: -> 'goodbye cruel world'
            User:
              parent: 'nail-common.Person'
              methods:
                hello: -> 'hello user'

          person = new lib.Person
          person.hello().should.equal 'hello world'
          delete nail.lib['nail-common.Person']
          delete nail.lib['nail-common.User']

####Advanced Overriding
Even if overriden the parents methods can still be called with `@constructor::`

        it 'allows calling the parents implementation', ->
          nail = nailCore.use parent, module.methods
          lib = {}
          nail.to lib, 'nail-common',
            Person:
              methods:
                hello: -> "hello #{@getName()}"
                getName: -> 'Person'
            User:
              parent: 'nail-common.Person'
              methods:
                hello: -> "#{@constructor::hello.apply @}!!!"
                getName: -> 'User'

          user = new lib.User

          user.hello().should.equal 'hello User!!!'
          delete nail.lib['nail-common.Person']
          delete nail.lib['nail-common.User']

As you can see in the example above, overriding the parents `getName` method
changes the result of `hello`. If this is not what you want, we have to
use `@constructor.definition.methods`.

        it 'can use a specific implementation', ->
          nail = nailCore.use parent, module.methods
          lib = {}
          nail.to lib, 'nail-common',
            Person:
              methods:
                hello: ->
                  "hello #{@constructor.definition.methods.getName.apply(@)}"
                getName: -> 'Person'
            User:
              parent: 'nail-common.Person'
              methods:
                hello: -> "#{@constructor::hello()}!!!"
                getName: -> 'User'

          user = new lib.User

          user.hello().should.equal 'hello Person!!!'
          delete nail.lib['nail-common.Person']
          delete nail.lib['nail-common.User']
