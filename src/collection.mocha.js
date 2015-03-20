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

    it('collection.length()', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        assert(collection.length() === 3);
    });

    it('collection.remove(model)', function() {
        var data = [
            {text: 'one', id: 'one'},
            {text: 'two', id: 'two'},
            {text: 'three', id:'three'}
        ];
        var collection = new Collection(data);

        var model1 = collection.findById('one');
        var model2 = collection.findById('two');
        var model3 = collection.findById('three');
        var removed;
        collection.on('change', function onRemoveModel(event) {
            if (event.action === 'REMOVE') {
                assert(event.changed === removed);
            } else {
                assert.fail('', '', 'collection must not subscribe removed models');
            }
        });
        
        removed = model1;
        collection.remove(model1);
        assert(collection.length() === 2);
        assert(collection.at(0) === model2);
        model1.set({text: 'removed'});

        removed = model2;
        collection.remove(model2);
        assert(collection.length() === 1);
        assert(collection.at(0) === model3);
        model2.set({text: 'removed'});

        removed = model3;
        collection.remove(model3);
        assert(collection.length() === 0);
        model3.set({text: 'removed'});
    });

    it('collection.add(data)', function() {
        var collection = new Collection();
        var addedData;
        collection.on('change', function(event) {
            assert(event.action === 'ADD');
            assert.deepEqual(event.changed.toJSON(), addedData);
        });
        assert(collection.length() === 0);

        addedData = {text: 'one', id: 'one'};
        collection.add(addedData);
        assert(collection.length() === 1);

        addedData = {text: 'two', id: 'two'};
        collection.add(addedData);
        assert(collection.length() === 2);

        addedData = {text: 'three', id: 'three'};
        collection.add(addedData);
        assert(collection.length() === 3);
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