var nailCore, properties, should, they, _;

should = require('should');

nailCore = require('nail-core');

properties = require('../coverage/instrument/lib/module.js').properties;

_ = require('underscore');

they = it;

describe('properties', function() {
  it('is an Object', function() {
    return (_.isObject(properties)).should.be.ok;
  });
  it('has a "aspect" string"', function() {
    return properties.aspect.should.be.a('string');
  });
  it('its aspect is "properties"', function() {
    return properties.aspect.should.equal('properties');
  });
  it('does not crash if the class has no properties', function() {
    var Person;
    Person = function() {};
    Person.definition = {};
    return properties.augment(Person);
  });
  it('has a "augment" function', function() {
    return (_.isFunction(properties.augment)).should.be.ok;
  });
  it('adds a property to a class prototype', function() {
    var Person, x;
    Person = function() {};
    Person.definition = {
      properties: {
        name: 'anon'
      }
    };
    properties.augment(Person);
    x = new Person;
    return x.name.should.equal('anon');
  });
  it('can be used as a nail module', function() {
    var lib, nail, x;
    nail = nailCore.use(properties);
    lib = nail.to({
      Person: {
        properties: {
          name: 'anon'
        }
      }
    });
    x = new lib.Person;
    return x.name.should.equal('anon');
  });
  return describe('supports the generic commands', function() {
    var lib, nail, x;
    nail = nailCore.use(properties);
    lib = nail.to({
      Person: {
        properties: {
          name: 'anon'
        }
      }
    });
    x = new lib.Person;
    it('GEN:set', function() {
      x['GEN:set']('name', 'whatever');
      return x.name.should.equal('whatever');
    });
    return it('GEN:get', function() {
      x.name = 'blub';
      return x['GEN:get']('name').should.equal('blub');
    });
  });
});
