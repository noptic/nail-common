var common, nail, nailCore, should, they, _;

should = require('should');

nailCore = require('nail-core');

common = require('../coverage/instrument/lib/module.js');

_ = require('underscore');

they = it;

nail = nailCore.use(common.fields, common.properties, common.injector);

describe('injector', function() {
  it('is an Object', function() {
    return (_.isObject(common.injector)).should.be.ok;
  });
  return it('injects properties', function() {
    var dean, lib;
    lib = nail.to({
      Person: {
        fields: {
          _name: 'anon',
          _email: null
        },
        properties: {
          email: {
            get: function() {
              return this._email;
            },
            set: function(value) {
              return this._email = value;
            }
          },
          name: {
            get: function() {
              return this._name;
            },
            set: function(value) {
              return this._name = value;
            }
          }
        }
      }
    });
    dean = new lib.Person({
      name: 'Dean',
      email: 'dean@example.com'
    });
    console.log(dean);
    dean.name.should.equal('Dean');
    return dean.email.should.equal('dean@example.com');
  });
});
