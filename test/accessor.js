var accessor, common, nail, nailCore, should, they, _;

should = require('should');

common = require('../coverage/instrument/lib/module.js');

accessor = common.accessor;

_ = require('underscore');

nailCore = require('nail-core');

nail = nailCore.use(accessor);

they = it;

describe('accesor', function() {
  it('is an Object', function() {
    return (_.isObject(common.accessor)).should.be.ok;
  });
  it('implements "augment"', function() {
    return _.isFunction(common.accessor.augment).should.be.ok;
  });
  it('has a "aspect" string"', function() {
    return accessor.aspect.should.be.a('string');
  });
  it('its aspect is "properties"', function() {
    return accessor.aspect.should.equal('properties');
  });
  it('does not crash if the class has no properties', function() {
    var Person;
    Person = function() {};
    Person.definition = {};
    return accessor.augment(Person);
  });
  return describe('functions', function() {
    var lib;
    lib = nail.to({
      Person: {
        properties: {
          firstName: 'anon',
          lastName: null
        }
      }
    });
    they('are created', function() {
      var dalia;
      dalia = new lib.Person;
      (_.isFunction(dalia.firstName)).should.be.ok;
      return (_.isFunction(dalia.lastName)).should.be.ok;
    });
    they('set property values', function() {
      var dalia;
      dalia = new lib.Person;
      dalia.firstName('Dalia');
      dalia.lastName('???');
      dalia._firstName.should.equal('Dalia');
      return dalia._lastName.should.equal('???');
    });
    they('get property values', function() {
      var x;
      x = new lib.Person;
      x._firstName = 'x';
      x._lastName = 'y';
      x.firstName().should.equal('x');
      return x.lastName().should.equal('y');
    });
    they('support GEN:set', function() {
      var dalia;
      dalia = new lib.Person;
      dalia['GEN:set']('firstName', 'Dalia');
      dalia['GEN:set']('lastName', '???');
      dalia._firstName.should.equal('Dalia');
      return dalia._lastName.should.equal('???');
    });
    return they('support GEN:get', function() {
      var x;
      x = new lib.Person;
      x._firstName = 'x';
      x._lastName = 'y';
      x['GEN:get']('firstName').should.equal('x');
      return x['GEN:get']('lastName').should.equal('y');
    });
  });
});
