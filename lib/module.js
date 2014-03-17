module.exports.fields = {
  aspect: 'fields',
  augment: function(newClass) {
    var fields, name, value, _ref, _results;
    fields = (_ref = newClass.definition[this.aspect]) != null ? _ref : {};
    _results = [];
    for (name in fields) {
      value = fields[name];
      _results.push(this.addProperty(newClass, name, value));
    }
    return _results;
  },
  addProperty: function(target, name, value) {
    return target.prototype[name] = value;
  }
};

var _;

_ = require('underscore');

module.exports.properties = {
  aspect: 'properties',
  augment: function(newClass) {
    var definition, name, properties, _ref, _results;
    properties = (_ref = newClass.definition[this.aspect]) != null ? _ref : {};
    _results = [];
    for (name in properties) {
      definition = properties[name];
      _results.push(this.addProperty(newClass, name, definition));
    }
    return _results;
  },
  addProperty: function(target, name, definition) {
    delete target.prototype[name];
    if (_.isFunction(definition)) {
      definition = {
        get: definition
      };
    }
    if (_.isUndefined(definition.set)) {
      definition.set = this.createWriteErrorFunction(name);
    }
    Object.defineProperty(target.prototype, name, {
      get: definition.get,
      set: definition.set
    });
    if (!_.isUndefined(definition.is)) {
      return target.prototype[name] = definition.is;
    }
  },
  createWriteErrorFunction: function(propertyName) {
    return function() {
      var realClass;
      realClass = this.constructor.className;
      throw new Error("Set error: " + realClass + "." + propertyName + " is a readonly property.");
    };
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

var _;

_ = require('underscore');

module.exports.injector = {
  augment: function(newClass) {
    return newClass.prototype['GEN:constructor'] = this.inject;
  },
  inject: function(properties) {
    var name, value;
    if (properties) {
      for (name in properties) {
        value = properties[name];
        this[name] = value;
      }
    }
    if (_.isFunction(this.init)) {
      return this.init.apply(this, arguments);
    }
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

var _;

_ = require('underscore');

module.exports.accessor = {
  aspect: 'properties',
  augment: function(newClass) {
    var defaultValue, escapedName, name, _ref;
    newClass.prototype['GEN:set'] = this.genSet;
    newClass.prototype['GEN:get'] = this.genGet;
    if (!_.isUndefined(newClass.definition[this.aspect])) {
      escapedName = '';
      _ref = newClass.definition[this.aspect];
      for (name in _ref) {
        defaultValue = _ref[name];
        newClass.prototype[name] = this.makeAccessor(name);
        newClass.prototype[this.escapeName(name)] = defaultValue;
      }
    }
    return this;
  },
  makeAccessor: function(propertyName) {
    var escapedName;
    escapedName = this.escapeName(propertyName);
    return function(newValue) {
      if (arguments.length === 0) {
        return this[escapedName];
      } else {
        return this[escapedName] = newValue;
      }
    };
  },
  escapeName: function(name) {
    return "_" + name;
  },
  genGet: function(name) {
    return this["_" + name];
  },
  genSet: function(name, value) {
    this["_" + name] = value;
    return this;
  }
};
