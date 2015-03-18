'use strict';

var EventEmitter = require('./eventemitter');
var extend = require('./extend');

function Model(data) {
    EventEmitter.call(this);
    this._data = data || {};
}

Model.prototype = Object.create(EventEmitter.prototype);

Model.prototype.id = function() {
    return this._data.id;
};

Model.prototype.toJSON = function() {
    return extend({}, this._data);
};

Model.prototype.get = function(key) {
    return this._data[key];
};

Model.prototype.has = function(key) {
    return this.get(key) != null;
};

Model.prototype.set = function(data) {
    var newData = extend(extend({}, this._data), data);
    this._data = newData;
    this.emit('change', {
        target: this,
        changed: data
    });
    return this;
};

module.exports = Model;