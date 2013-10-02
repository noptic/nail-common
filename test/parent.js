var nailCore, parent, should, _;

should = require('should');

nailCore = require('nail-core');

parent = require('../coverage/instrument/lib/module.js').parent;

_ = require('underscore');

describe('parent', function() {
  it('is an Object', function() {
    return (_.isObject(parent)).should.be.ok;
  });
  it('has a "aspect" string"', function() {
    return parent.aspect.should.be.a('string');
  });
  it('its aspect is "parent"', function() {
    return parent.aspect.should.equal('parent');
  });
  it('does not crash if the class has no parent', function() {
    var Person;
    Person = function() {};
    Person.definition = {};
    return parent.augment(Person);
  });
  it('has a "augment" function', function() {
    return (_.isFunction(parent.augment)).should.be.ok;
  });
  it('can be used as a nail module', function() {
    var lib, nail, parentClass, x;
    nail = nailCore.use(parent);
    parentClass = function() {};
    lib = nail.to({
      User: {
        parent: parentClass
      }
    });
    x = new lib.User;
    return (x instanceof parentClass).should.be.ok;
  });
  return describe('creates a prototype chain', function() {
    it('with a constructor', function() {
      var Person, User, x;
      Person = function() {};
      User = function() {};
      User.definition = {
        parent: Person
      };
      parent.augment(User);
      x = new User;
      return (x instanceof Person).should.be.ok;
    });
    it('with a object', function() {
      var Person, User, x;
      Person = function() {};
      User = function() {};
      User.definition = {
        parent: new Person()
      };
      parent.augment(User);
      x = new User;
      return (x instanceof Person).should.be.ok;
    });
    return it('with a string', function() {
      var User, x;
      nailCore.lib['nail-common.Person'] = function() {};
      User = function() {};
      User.definition = {
        parent: 'nail-common.Person'
      };
      User.nail = nailCore;
      parent.augment(User);
      x = new User;
      (x instanceof nailCore.lib['nail-common.Person']).should.be.ok;
      return nailCore.lib['nail-common.Person'] = void 0;
    });
  });
});
