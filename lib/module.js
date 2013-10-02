module.exports.properties = {
  aspect: 'properties',
  augment: function(newClass) {
    var name, properties, value, _ref, _results;
    properties = (_ref = newClass.definition[this.aspect]) != null ? _ref : {};
    newClass.prototype['GEN:get'] = this.genGet;
    newClass.prototype['GEN:set'] = this.genSet;
    _results = [];
    for (name in properties) {
      value = properties[name];
      _results.push(this.addProperty(newClass, name, value));
    }
    return _results;
  },
  addProperty: function(target, name, value) {
    return target.prototype[name] = value;
  },
  genGet: function(name) {
    return this[name];
  },
  genSet: function(name, value) {
    this[name] = value;
    return this;
  }
};

module.exports.methods = {
  aspect: 'methods',
  augment: function(newClass) {
    var methods, name, value, _ref, _results;
    methods = (_ref = newClass.definition[this.aspect]) != null ? _ref : {};
    _results = [];
    for (name in methods) {
      value = methods[name];
      _results.push(this.addMethod(newClass, name, value));
    }
    return _results;
  },
  addMethod: function(target, name, value) {
    return target.prototype[name] = value;
  }
};

module.exports.injector = {
  augment: function(newClass) {
    return newClass.prototype['GEN:constructor'] = this.inject;
  },
  inject: function(properties) {
    var name, value;
    for (name in properties) {
      value = properties[name];
      this['GEN:set'](name, value);
    }
    return this;
  }
};

var _;

_ = require('underscore');

module.exports.parent = {
  aspect: 'parent',
  augment: function(newClass) {
    if (newClass.definition.parent) {
      switch (typeof newClass.definition.parent) {
        case 'function':
          return newClass.prototype = new newClass.definition.parent;
        case 'object':
          return newClass.prototype = newClass.definition.parent;
        case 'string':
          return newClass.prototype = new newClass.nail.lib[newClass.definition.parent];
      }
    }
  }
};

var _;

_ = require('underscore');

module.exports.init = {
  augment: function(newClass) {
    return newClass.prototype['GEN:constructor'] = this.callInit;
  },
  callInit: function() {
    var _ref;
    if ((_ref = this.init) != null) {
      _ref.apply(this, arguments);
    }
    return this;
  }
};
