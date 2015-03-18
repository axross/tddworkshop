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
    emit: function(event, payload) {
        this._events[event].forEach(function(callback) {
            callback.call(this, payload);
        }.bind(this));
        return this;
    }
};

module.exports = EventEmitter;