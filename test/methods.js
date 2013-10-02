var methods, nailCore, should, they, _;

should = require('should');

nailCore = require('nail-core');

methods = require('../coverage/instrument/lib/module.js').methods;

_ = require('underscore');

they = it;

describe('methods', function() {
  it('is an Object', function() {
    return (_.isObject(methods)).should.be.ok;
  });
  it('has a "aspect" string"', function() {
    return methods.aspect.should.be.a('string');
  });
  it('its aspect is "methods"', function() {
    return methods.aspect.should.equal('methods');
  });
  it('does not crash if the class has no methods', function() {
    var Person;
    Person = function() {};
    Person.definition = {};
    return methods.augment(Person);
  });
  it('has a "augment" function', function() {
    return (_.isFunction(methods.augment)).should.be.ok;
  });
  it('adds a method to a class prototype', function() {
    var Person, x;
    Person = function() {};
    Person.definition = {
      methods: {
        hello: function() {
          return 'hello world';
        }
      }
    };
    methods.augment(Person);
    x = new Person;
    return x.hello().should.equal('hello world');
  });
  return it('can be used as a nail module', function() {
    var lib, nail, x;
    nail = nailCore.use(methods);
    lib = nail.to({
      Person: {
        methods: {
          hello: function() {
            return 'hello world';
          }
        }
      }
    });
    x = new lib.Person;
    return x.hello().should.equal('hello world');
  });
});
