'use strict';

function EventEmitter() {
    this._events = {};
}

EventEmitter.prototype = {
    on: function(event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
        return this;
    },
    off: function(event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        var index = this._events[event].indexOf(callback);
        if (index !== -1) {
            this._events[event].splice(index, 1);
        }
        return this;
    },
    emit: function(event, payload) {
        var events = this._events[event] || [];
        events.forEach(function(callback) {
            callback.call(this, payload);
        }.bind(this));
        return this;
    }
};

module.exports = EventEmitter;