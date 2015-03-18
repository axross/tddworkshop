'use strict';

var assert = require('power-assert');
var EventEmitter = require('./eventemitter');

describe('EventEmitter', function() {
    it('event.emit', function() {
        var event = new EventEmitter();
        event.on('test', function(e) {
            assert.deepEqual(e, {test: 'Hello'});
        });
        event.emit('test', {test: 'Hello'});
    });
});