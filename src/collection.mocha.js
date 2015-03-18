'use strict';

var assert = require('power-assert');
var Collection = require('./collection');
var Model = require('./model');

describe('Collection', function() {
    it('collectionはModelの集合である', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            assert(collection.models[i] instanceof Model);
        }
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            assert(collection.models[i].get('text'), data[i].text);
        }
    });

    it('collection.toJSON()', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        assert.deepEqual(collection.toJSON(), data);
    });

    it('collection.findById(id)', function() {
        var data = [
            {text: 'one', id: 'one'},
            {text: 'two', id: 'two'},
            {text: 'three', id:'three'}
        ];
        var collection = new Collection(data);
        assert.deepEqual(collection.findById('one').toJSON(), data[0]);
        assert.deepEqual(collection.findById('two').toJSON(), data[1]);
        assert.deepEqual(collection.findById('three').toJSON(), data[2]);
        assert(collection.findById('four') === null);
    });

    it('collection.at(index)', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            assert.deepEqual(collection.at(i).toJSON(), data[i]);
        }
    });

    it('collectionはModelのchangeイベントを購読する', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        collection.on('change', function(event) {
            assert.deepEqual(event.changed.toJSON(), {text: 'four'});
        });
        collection.at(0).set({text: 'four'});
    });
});