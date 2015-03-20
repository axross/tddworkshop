'use strict';

var assert = require('power-assert');
var EventEmitter = require('./eventemitter');

describe('EventEmitter', function() {
    it('event.emit', function() {
        var event = new EventEmitter();
        event.emit('test', {test: 'Hello'});
        event.on('test', function(e) {
            assert.deepEqual(e, {test: 'Hello'});
        });
        event.emit('test', {test: 'Hello'});
    });

    it('event.off', function() {
        var event = new EventEmitter();

        var fail = function(e) {
            assert.fail('fail is called', 'fail is not called', 'event handler should not be called after removed');
        };

        event.emit('test', {test: 'Hello'});
        event.on('test', fail);
        event.off('test', fail);
        event.emit('test', {test: 'Hello'});
    });
});