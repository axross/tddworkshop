'use strict';

var assert = require('power-assert');
var Collection = require('./collection');
var Model = require('./model');
var EventEmitter = require('./eventemitter');
var expect = require('expect.js');

describe('Collection', function() {

    it('CollectionはEventEmitterをプロトタイプ継承している', function() {
        assert(Collection.prototype.on === EventEmitter.prototype.on);
        assert(Collection.prototype.off === EventEmitter.prototype.off);
        assert(Collection.prototype.emit === EventEmitter.prototype.emit);

        var collection = new Collection();

        assert(Object.getPrototypeOf(collection).on === EventEmitter.prototype.on);
        assert(Object.getPrototypeOf(collection).off === EventEmitter.prototype.off);
        assert(Object.getPrototypeOf(collection).emit === EventEmitter.prototype.emit);

        assert(EventEmitter.prototype.isPrototypeOf(collection) === true);
    });

    it('CollectionのコンストラクタはEventEmitterのコンストラクタを呼び出す', function() {
        var collection = new Collection();
        //EventEmitterのコンストラクタは_eventsプロパティを{}で初期化する
        assert.deepEqual(collection._events, {});
    });

    it('Collectionのコンストラクタはmodelsプロパティをコンストラクタ引数がない場合[]で初期化する', function() {
        var collection = new Collection();
        assert.deepEqual(collection.models, []);
    });

    it('Collectionはコンストラクタ引数で受け取ったオブジェクトの配列をModelに変換して、modelsプロパティに保持する', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            assert(Model.prototype.isPrototypeOf(collection.models[i]));
        }
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            assert(collection.models[i].get('text') === data[i].text);
        }
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            assert.deepEqual(collection.models[i].toJSON(), data[i]);
        }
    });

    it('Collection#toJSON()はコンストラクタ引数で受け取ったオブジェクトの配列をコピーを返す', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        assert.deepEqual(collection.toJSON(), data);
        assert(collection.toJSON() !== data);
    });

    it('Collection#at(index)はindex番目のモデルを返す', function() {
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

    it('Collection#length()は保持しているモデルの数を返す', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        assert(collection.length() === 3);
    });

    it('Collection#findById(id)はidからモデルを検索する', function() {
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

    it('CollectionはModelのchangeイベントを購読する', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        var fired = 'changeイベント発火してない';
        collection.on('change', function(event) {
            fired = 'changeイベント発火した';
            assert.deepEqual(event.changed.toJSON(), {text: 'four'});
        });
        collection.at(0).set({text: 'four'});
        assert(fired === 'changeイベント発火した');
    });

    it('Collection#remove(model)は指定したモデルを取り除く', function() {
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
        
        removed = model1;
        collection.remove(model1);
        assert(collection.length() === 2);
        assert(collection.at(0) === model2);

        removed = model2;
        collection.remove(model2);
        assert(collection.length() === 1);
        assert(collection.at(0) === model3);

        removed = model3;
        collection.remove(model3);
        assert(collection.length() === 0);
    });

    it('Collection#remove(model)は指定したモデルを取り除くとchangeイベントを発火する', function() {
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
                expect.fail('collection must not subscribe removed models');
            }
        });
        
        removed = model1;
        collection.remove(model1);
        model1.set({text: 'removed'});

        removed = model2;
        collection.remove(model2);
        model2.set({text: 'removed'});

        removed = model3;
        collection.remove(model3);
        model3.set({text: 'removed'});
    });

    it('Collection#add(data)はデータをモデルに変換して追加する', function() {
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
        assert.deepEqual(collection.at(0).toJSON(), {text: 'one', id: 'one'});

        addedData = {text: 'two', id: 'two'};
        collection.add(addedData);
        assert(collection.length() === 2);
        assert.deepEqual(collection.at(1).toJSON(), {text: 'two', id: 'two'});

        addedData = {text: 'three', id: 'three'};
        collection.add(addedData);
        assert(collection.length() === 3);
        assert.deepEqual(collection.at(2).toJSON(), {text: 'three', id: 'three'});
    });

    it('Collection#add(data)はデータをモデルに変換して追加して、changeイベントを発火する', function() {
        var collection = new Collection();
        var addedData;
        collection.on('change', function(event) {
            assert(event.action === 'ADD');
            assert.deepEqual(event.changed.toJSON(), addedData);
        });

        addedData = {text: 'one', id: 'one'};
        collection.add(addedData);

        addedData = {text: 'two', id: 'two'};
        collection.add(addedData);

        addedData = {text: 'three', id: 'three'};
        collection.add(addedData);
    });
});