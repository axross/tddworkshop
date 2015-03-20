'use strict';

var EventEmitter = require('./eventemitter');
var Model = require('./model');

function Collection(list) {
    list = list || [];
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

Collection.prototype.length = function() {
    return this.models.length;
};

Collection.prototype.findById = function(id) {
    for (var key in this.models) {
        if (this.models[key].id() === id) {
            return this.models[key];
        }
    }
    return null;
};

Collection.prototype.remove = function(model) {
    var index = this.models.indexOf(model);
    if (index !== -1) {
        model.off('change', this.onModelChange);
        this.models.splice(index, 1);
        this.emit('change', {
            target: this,
            changed: model,
            action: 'REMOVE'
        });
    }
};

Collection.prototype.add = function(data) {
    var model = new Model(data);
    model.on('change', this.onModelChange);
    this.models.push(model);
    this.emit('change', {
        target: this,
        changed: model,
        action: 'ADD'
    });
};

Collection.prototype.toJSON = function() {
    return this.models.slice().map(function(model) {
        return model.toJSON();
    });
};

module.exports = Collection;