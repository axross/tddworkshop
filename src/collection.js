'use strict';

var EventEmitter = require('./eventemitter');
var Model        = require('./model');

var Collection = function(data) {
  EventEmitter.call(this);

  this._data  = data || [];
  this.models = [];

  if (Object.prototype.toString.call(data) === '[object Array]') {
    this.models = data.map(function(v) { return new Model(v) });
  }

  var onModelChange = function(arg) {
    this.emit('change', arg);
  }.bind(this);

  this.models.forEach(function(model) {
    model.on('change', onModelChange);
  });
};

Collection.prototype = Object.create(EventEmitter.prototype);

Collection.prototype.toJSON = function() {
  return this._data.concat([]);
};

Collection.prototype.at = function(index) {
  return this.models[index];
};

Collection.prototype.length = function() {
  return this.models.length;
};

Collection.prototype.findById = function(id) {
  return this.models.filter(function(model) {
    return model.id() === id;
  })[0] || null;
};

Collection.prototype.remove = function(model) {
  this.models = this.models.filter(function(m) {
    return model !== m;
  });

  this.emit('change', { action: 'REMOVE', changed: model });
};

Collection.prototype.add = function(data) {
  var model = new Model(data);

  this.models.push(model);

  this.emit('change', { action: 'ADD', changed: model });
};



module.exports = Collection;
