var common, nail, nailCore, should, they, _;

should = require('should');

nailCore = require('nail-core');

common = require('../coverage/instrument/lib/module.js');

_ = require('underscore');

they = it;

nail = nailCore.use(common.properties, common.injector);

describe('injector', function() {
  it('is an Object', function() {
    return (_.isObject(common.injector)).should.be.ok;
  });
  return it('injects properties', function() {
    var dean, lib;
    lib = nail.to({
      Person: {
        name: 'anon',
        email: null
      }
    });
    dean = new lib.Person({
      name: 'Dean',
      email: 'dean@example.com'
    });
    dean.name.should.equal('Dean');
    return dean.email.should.equal('dean@example.com');
  });
});
