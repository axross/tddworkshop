'use strict';

var EventEmitter = require('./eventemitter');

describe('EventEmitter', function() {
    it('event.emit', function() {
        var event = new EventEmitter();
        event.on('test', function(e) {
            expect(e).toEqual({test: 'Hello'});
        });
        event.emit('test', {test: 'Hello'});
    });
});