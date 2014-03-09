
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

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

[About]: spec\About.coffee.md
[accessor]: spec\accessor.coffee.md
[fields]: spec\fields.coffee.md
[init]: spec\init.coffee.md
[injector]: spec\injector.coffee.md
[methods]: spec\methods.coffee.md
[parent]: spec\parent.coffee.md
[properties]: spec\properties.coffee.md

nail-common
===========
A bundle of common nail modules.

Modules
-------

 - [init] bint the constructor to the bin method
 - [injector] enforces a property injection constructor
 - [methods] adds methods to a class
 - [parent] inherit from another class (uses prototype chaining)
 - [properties] adds properties to a class
 - [accessor] adds encapsulated properties and a accessor method for each property


##Setup
Install with npm:
```bash
npm install nail-common
```

Clone with GIT:
```bash
git clone git://github.com/noptic/nail-common.git
```

##Documentation
Head here → [docs](docs)

##Dependencies
 - [underscore] ~1.5.1

##DevDependencies
 - [grunt-contrib-coffee] 0.7.0
 - [grunt] 0.4.1
 - [grunt-simple-mocha] ~0.4.0
 - [mocha] ~1.12.0
 - [should] ~1.2.2
 - [grunt-istanbul-coverage] 0.0.1
 - [grunt-istanbul] ~0.2.3
 - [nail-core] 0.1.0-beta3
 - [glob] ~3.2.6
