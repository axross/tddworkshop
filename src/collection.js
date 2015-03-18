'use strict';

var EventEmitter = require('./eventemitter');
var Model = require('./model');

function Collection(list) {
    EventEmitter.call(this);
    this.onModelChange = this._onModelChange.bind(this);
    this.models = list.map(function(item) {
        var model = new Model(item);
        model.on('change', this.onModelChange);
        return model;
    }.bind(this));
};

Collection.prototype = Object.create(EventEmitter.prototype);

Collection.prototype._onModelChange = function(event) {
    this.emit('change', {
        target: this,
        changed: event.target
    });
};

Collection.prototype.at = function(index) {
    return this.models[index];
};

Collection.prototype.findById = function(id) {
    for (var key in this.models) {
        if (this.models[key].id() === id) {
            return this.models[key];
        }
    }
    return null;
};

Collection.prototype.toJSON = function() {
    return this.models.slice().map(function(model) {
        return model.toJSON();
    });
};

module.exports = Collection;