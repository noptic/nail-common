var common, nail, nailCore, should, _;

should = require('should');

nailCore = require('nail-core');

common = require('../coverage/instrument/lib/module.js');

_ = require('underscore');

nail = nailCore.use(common.fields, common.properties, common.methods, common.injector);

describe('injector', function() {
  it('is an Object', function() {
    return (_.isObject(common.injector)).should.be.ok;
  });
  it('injects filds and properties', function() {
    var dean, lib;
    lib = nail.to({
      Person: {
        properties: {
          email: {
            get: function() {
              return this._email;
            },
            set: function(value) {
              return this._email = value;
            }
          }
        },
        fields: {
          name: null
        }
      }
    });
    dean = new lib.Person({
      name: 'Dean',
      email: 'dean@example.com'
    });
    dean.name.should.equal('Dean');
    return dean.email.should.equal('dean@example.com');
  });
  it('calls the init method', function() {
    var dean, lib;
    lib = nail.to({
      Person: {
        properties: {
          email: {
            get: function() {
              return this._email;
            },
            set: function(value) {
              return this._email = value;
            }
          }
        },
        fields: {
          name: null
        },
        methods: {
          init: function() {
            if (_.isString(this.email)) {
              return this.email = this.email.toLowerCase();
            }
          }
        }
      }
    });
    dean = new lib.Person({
      name: 'Dean',
      email: 'DEAN@ExAmPlE.com'
    });
    dean.name.should.equal('Dean');
    return dean.email.should.equal('dean@example.com');
  });
  it('passes arguments to init', function() {
    var lib, name, test;
    lib = nail.to({
      Thing: {
        fields: name = null,
        methods: {
          init: function(values, aNumber, aText) {
            return this.stuff = "" + aNumber + " and " + aText;
          }
        }
      }
    });
    test = new lib.Thing({
      name: 'boxy'
    }, 12, 'five');
    test.name.should.equal('boxy');
    return test.stuff.should.equal('12 and five');
  });
  return it('is optional', function() {
    var lib, name, test;
    lib = nail.to({
      Thing: {
        fields: name = null,
        methods: {
          init: function(values, aNumber, aText) {
            return this.stuff = "" + aNumber + " and " + aText;
          }
        }
      }
    });
    test = new lib.Thing(null, 12, 'five');
    return test.stuff.should.equal('12 and five');
  });
});
