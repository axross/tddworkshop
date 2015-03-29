'use strict';

var extend       = require('./extend');
var EventEmitter = require('./eventemitter');

var Model = function(data) {
  EventEmitter.call(this);  // call super

  this._data = data || {};
};

// set super to EventEmitter
Model.prototype = Object.create(EventEmitter.prototype);

Model.prototype.id = function() {
  return this._data.id;
};

Model.prototype.get = function(key) {
  return this._data[key];
};

Model.prototype.has = function(key) {
  return typeof this._data[key] !== 'undefined';
};

Model.prototype.toJSON = function() {
  return extend({}, this._data);
};

Model.prototype.set = function(data) {
  this._data = extend(this._data, data);

  this.emit('change', { changed: data, target: this });
};

module.exports = Model;
