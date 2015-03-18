'use strict';

var assert = require('power-assert');
var Model = require('./model');

describe('Model', function() {
    it('model.id()', function() {
        var model = new Model({id: 123});
        assert(model.id() === 123);
    });

    it('model.get(key)', function() {
        var model = new Model({message: 'Hello!'});
        assert(model.get('message') === 'Hello!');
        assert(model.get('nothing') === undefined);
    });

    it('model.has(key)', function() {
        var model = new Model({message: 'Hello!'});
        assert(model.has('message') === true);
        assert(model.has('nothing') === false);
    });

    it('model.set(data)', function() {
        var model = new Model({message: 'Hello!'});
        model.on('change', function(event) {
            assert.deepEqual({ message: 'World!', foo: 'bar' }, { message: 'World!', foo: 'bar' });
            assert.deepEqual(event.changed, {message: 'World!', foo: 'bar'});
            assert.deepEqual(event.target.toJSON(), {message: 'World!', foo: 'bar'});
        });
        model.set({message: 'World!', foo: 'bar'});
        assert(model.get('message') === 'World!');
        assert(model.get('foo') === 'bar');
    });
});