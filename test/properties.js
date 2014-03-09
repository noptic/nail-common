var fields, nailCore, properties, should, they, _;

should = require('should');

nailCore = require('nail-core');

properties = require('../coverage/instrument/lib/module.js').properties;

fields = require('../coverage/instrument/lib/module.js').fields;

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
        name: {
          get: function() {
            return this._name;
          },
          set: function(newValue) {
            return this._name = newValue;
          }
        }
      }
    };
    properties.augment(Person);
    x = new Person;
    x.name = 'sam';
    return x.name.should.equal('sam');
  });
  it('can be used as a nail module', function() {
    var lib, nail, x;
    nail = nailCore.use(fields, properties);
    lib = nail.to({
      Person: {
        properties: {
          name: {
            get: function() {
              return this._name;
            },
            set: function(newValue) {
              return this._name = newValue;
            }
          }
        }
      }
    });
    x = new lib.Person;
    x.name = 'someone';
    return x.name.should.equal('someone');
  });
  it('can be initialized wih `is`', function() {
    var lib, nail, x;
    nail = nailCore.use(fields, properties);
    lib = nail.to({
      Person: {
        properties: {
          name: {
            get: function() {
              return this._name;
            },
            set: function(newValue) {
              return this._name = newValue;
            },
            is: 'anon'
          }
        }
      }
    });
    x = new lib.Person;
    return x.name.should.equal('anon');
  });
  it('can create multiple properties', function() {
    var lib, nail, x;
    nail = nailCore.use(properties);
    lib = nail.to({
      Person: {
        properties: {
          firstName: {
            get: function() {
              return this._firstName;
            },
            set: function(newValue) {
              return this._firstName = newValue;
            }
          },
          lastName: {
            get: function() {
              return this._lastName;
            },
            set: function(newValue) {
              return this._lastName = newValue;
            }
          }
        }
      }
    });
    x = new lib.Person;
    x.firstName = 'someone';
    x.lastName = 'else';
    x.firstName.should.equal('someone');
    x.lastName.should.equal('else');
    return console.log(x);
  });
  return it('can be used with multiple instances', function() {
    var lib, nail, x, y;
    nail = nailCore.use(fields, properties);
    lib = nail.to({
      Person: {
        properties: {
          name: {
            get: function() {
              return this._name;
            },
            set: function(newValue) {
              return this._name = newValue;
            }
          }
        }
      }
    });
    x = new lib.Person;
    y = new lib.Person;
    x.name = 'someone';
    y.name = 'thisone';
    x.name.should.equal('someone');
    return y.name.should.equal('thisone');
  });
});
