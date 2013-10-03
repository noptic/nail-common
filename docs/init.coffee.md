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
        _.isObject(common.init).should.be.ok
          
      it 'implements "augment"', ->
        _.isFunction(common.init.augment).should.be.ok
      
      it 'does not crash without a constructor', ->
        lib = nail.to Person: {}
        kira = new lib.Person
      
      it 'binds the constructor to the "init" method', ->
        lib = nail.to Person: {}
        lib.Person::init = (name) -> @name = name
        
        benjamin = new lib.Person 'Benjamin'
        benjamin.name.should.equal 'Benjamin'