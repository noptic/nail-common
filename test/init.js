var common, nail, nailCore, should, _;

should = require('should');

common = require('../coverage/instrument/lib/module.js');

_ = require('underscore');

nailCore = require('nail-core');

nail = nailCore.use(common.init);

describe('init', function() {
  it('is an Object', function() {
    return _.isObject(common.init).should.be.ok;
  });
  it('implements "augment"', function() {
    return _.isFunction(common.init.augment).should.be.ok;
  });
  it('does not crash without a constructor', function() {
    var kira, lib;
    lib = nail.to({
      Person: {}
    });
    return kira = new lib.Person;
  });
  return it('binds the constructor to the "init" method', function() {
    var benjamin, lib;
    lib = nail.to({
      Person: {}
    });
    lib.Person.prototype.init = function(name) {
      return this.name = name;
    };
    benjamin = new lib.Person('Benjamin');
    return benjamin.name.should.equal('Benjamin');
  });
});
