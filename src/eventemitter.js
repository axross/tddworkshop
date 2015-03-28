'use strict';

var EventEmitter = function() {
  this._events = {};
};

EventEmitter.prototype.on = function(name, callback) {
  if (!this.isSomeCallbackRegisteredWithName(name)) {
    this._events[name] = [];
  }

  this._events[name].push(callback);
};

EventEmitter.prototype.off = function(name, callback) {
  if (!this.isSomeCallbackRegisteredWithName(name)) {
    return null;
  }

  var isDeleted = false;
  var callbacks = this._events[name];

  this._events[name] = callbacks
    .map(function(cb) {
      if (cb === callback && !isDeleted) {
        isDeleted = true;
        return null;
      }

      return cb;
    })
    .filter(function(cb) {
      return !!cb;
    });

  return true;
};

EventEmitter.prototype.emit = function(name, arg) {
  if (!this.isSomeCallbackRegisteredWithName(name)) {
    return null;
  }

  this._events[name].forEach(function(cb) {
    cb.call(this, arg);
  }, this);
};

EventEmitter.prototype.isSomeCallbackRegisteredWithName = function(name) {
  return !!this._events[name];
};

module.exports = EventEmitter;
