var module, nailCore, parent, should, _;

should = require('should');

nailCore = require('nail-core');

module = require('../coverage/instrument/lib/module.js');

parent = module.parent;

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
  describe('creates a prototype chain', function() {
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
      return delete nailCore.lib['nail-common.Person'];
    });
  });
  return describe('methods', function() {
    var nail, user;
    nail = nailCore.use(parent, module.methods);
    it('are inherited', function() {});
    nail.to('nail-common', {
      Person: {
        methods: {
          hello: function() {
            return 'hello world';
          }
        }
      },
      User: {
        parent: 'nail-common.Person',
        methods: {
          bye: function() {
            return 'goodbye cruel world';
          }
        }
      }
    });
    user = new nail.lib['nail-common.User'];
    user.hello().should.equal('hello world');
    user.bye().should.equal('goodbye cruel world');
    delete nail.lib['nail-common.Person'];
    delete nail.lib['nail-common.User'];
    it('can be overriden', function() {
      var lib;
      lib = {};
      nail.to(lib, 'nail-common', {
        Person: {
          methods: {
            hello: function() {
              return 'hello world';
            },
            bye: function() {
              return 'goodbye cruel world';
            }
          }
        },
        User: {
          parent: 'nail-common.Person',
          methods: {
            hello: function() {
              return 'hello user';
            }
          }
        }
      });
      user = new lib.User;
      user.hello().should.equal('hello user');
      delete nail.lib['nail-common.Person'];
      return delete nail.lib['nail-common.User'];
    });
    it('does not change the parent', function() {
      var lib, person;
      nail = nailCore.use(parent, module.methods);
      lib = {};
      nail.to(lib, 'nail-common', {
        Person: {
          methods: {
            hello: function() {
              return 'hello world';
            },
            bye: function() {
              return 'goodbye cruel world';
            }
          }
        },
        User: {
          parent: 'nail-common.Person',
          methods: {
            hello: function() {
              return 'hello user';
            }
          }
        }
      });
      person = new lib.Person;
      person.hello().should.equal('hello world');
      delete nail.lib['nail-common.Person'];
      return delete nail.lib['nail-common.User'];
    });
    it('allows calling the parents implementation', function() {
      var lib;
      nail = nailCore.use(parent, module.methods);
      lib = {};
      nail.to(lib, 'nail-common', {
        Person: {
          methods: {
            hello: function() {
              return "hello " + (this.getName());
            },
            getName: function() {
              return 'Person';
            }
          }
        },
        User: {
          parent: 'nail-common.Person',
          methods: {
            hello: function() {
              return "" + (this.constructor.prototype.hello.apply(this)) + "!!!";
            },
            getName: function() {
              return 'User';
            }
          }
        }
      });
      user = new lib.User;
      user.hello().should.equal('hello User!!!');
      delete nail.lib['nail-common.Person'];
      return delete nail.lib['nail-common.User'];
    });
    return it('can use a specific implementation', function() {
      var lib;
      nail = nailCore.use(parent, module.methods);
      lib = {};
      nail.to(lib, 'nail-common', {
        Person: {
          methods: {
            hello: function() {
              return "hello " + (this.constructor.definition.methods.getName.apply(this));
            },
            getName: function() {
              return 'Person';
            }
          }
        },
        User: {
          parent: 'nail-common.Person',
          methods: {
            hello: function() {
              return "" + (this.constructor.prototype.hello()) + "!!!";
            },
            getName: function() {
              return 'User';
            }
          }
        }
      });
      user = new lib.User;
      user.hello().should.equal('hello Person!!!');
      delete nail.lib['nail-common.Person'];
      return delete nail.lib['nail-common.User'];
    });
  });
});
