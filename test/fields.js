var fields, nailCore, should, they, _;

should = require('should');

nailCore = require('nail-core');

fields = require('../coverage/instrument/lib/module.js').fields;

_ = require('underscore');

they = it;

describe('fields', function() {
  it('is an Object', function() {
    return (_.isObject(fields)).should.be.ok;
  });
  it('has a "aspect" string"', function() {
    return fields.aspect.should.be.a('string');
  });
  it('its aspect is "fields"', function() {
    return fields.aspect.should.equal('fields');
  });
  it('does not crash if the class has no fields', function() {
    var Person;
    Person = function() {};
    Person.definition = {};
    return fields.augment(Person);
  });
  it('has a "augment" function', function() {
    return (_.isFunction(fields.augment)).should.be.ok;
  });
  it('adds a field to a class prototype', function() {
    var Person, x;
    Person = function() {};
    Person.definition = {
      fields: {
        name: 'anon'
      }
    };
    fields.augment(Person);
    x = new Person;
    return x.name.should.equal('anon');
  });
  return it('can be used as a nail module', function() {
    var lib, nail, x;
    nail = nailCore.use(fields);
    lib = nail.to({
      Person: {
        fields: {
          name: 'anon'
        }
      }
    });
    x = new lib.Person;
    return x.name.should.equal('anon');
  });
});
