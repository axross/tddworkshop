'use strict';

var Collection = require('./collection');
var Model = require('./model');
var EventEmitter = require('./eventemitter');

describe('Collection', function() {

    it('CollectionはEventEmitterをプロトタイプ継承している', function() {
        expect(Collection.prototype.on).toBe(EventEmitter.prototype.on);
        expect(Collection.prototype.off).toBe(EventEmitter.prototype.off);
        expect(Collection.prototype.emit).toBe(EventEmitter.prototype.emit);

        var collection = new Collection();

        expect(Object.getPrototypeOf(collection).on).toBe(EventEmitter.prototype.on);
        expect(Object.getPrototypeOf(collection).off).toBe(EventEmitter.prototype.off);
        expect(Object.getPrototypeOf(collection).emit).toBe(EventEmitter.prototype.emit);

        expect(EventEmitter.prototype.isPrototypeOf(collection)).toBe(true);
    });

    it('CollectionのコンストラクタはEventEmitterのコンストラクタを呼び出す', function() {
        var collection = new Collection();
        //EventEmitterのコンストラクタは_eventsプロパティを{}で初期化する
        expect(collection._events).toEqual({});
    });

    it('Collectionのコンストラクタはmodelsプロパティをコンストラクタ引数がない場合[]で初期化する', function() {
        var collection = new Collection();
        expect(collection.models).toEqual([]);
    });

    it('Collectionはコンストラクタ引数で受け取ったオブジェクトの配列をModelに変換して、modelsプロパティに保持する', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            expect(Model.prototype.isPrototypeOf(collection.models[i])).toBe(true);
        }
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            expect(collection.models[i].get('text')).toBe(data[i].text);
        }
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            expect(collection.models[i].toJSON()).toEqual(data[i]);
        }
    });

    it('Collection#toJSON()はコンストラクタ引数で受け取ったオブジェクトの配列をコピーを返す', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        expect(collection.toJSON()).toEqual(data);
        expect(collection.toJSON()).not.toBe(data);
    });

    it('Collection#at(index)はindex番目のモデルを返す', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        for (var i = 0, length = collection.models.length; i < length; ++i) {
            expect(collection.at(i).toJSON()).toEqual(data[i]);
        }
    });

    it('Collection#length()は保持しているモデルの数を返す', function() {
        var data = [
            {text: 'one'},
            {text: 'two'},
            {text: 'three'}
        ];
        var collection = new Collection(data);
        expect(collection.length()).toBe(3);
    });

    it('Collection#findById(id)はidからモデルを検索する', function() {
        var data = [
            {text: 'one', id: 'one'},
            {text: 'two', id: 'two'},
            {text: 'three', id:'three'}
        ];
        var collection = new Collection(data);
        expect(collection.findById('one').toJSON()).toEqual(data[0]);
        expect(collection.findById('two').toJSON()).toEqual(data[1]);
        expect(collection.findById('three').toJSON()).toEqual(data[2]);
        expect(collection.findById('four')).toBe(null);
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
            expect(event.changed.toJSON()).toEqual({text: 'four'});
        });
        collection.at(0).set({text: 'four'});
        expect(fired).toBe('changeイベント発火した');
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
        expect(collection.length()).toBe(2);
        expect(collection.at(0)).toBe(model2);

        removed = model2;
        collection.remove(model2);
        expect(collection.length()).toBe(1);
        expect(collection.at(0)).toBe(model3);

        removed = model3;
        collection.remove(model3);
        expect(collection.length()).toBe(0);
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
                expect(event.changed).toBe(removed);
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
            expect(event.action).toBe('ADD');
            expect(event.changed.toJSON()).toEqual(addedData);
        });
        expect(collection.length()).toBe(0);

        addedData = {text: 'one', id: 'one'};
        collection.add(addedData);
        expect(collection.length()).toBe(1);
        expect(collection.at(0).toJSON()).toEqual({text: 'one', id: 'one'});

        addedData = {text: 'two', id: 'two'};
        collection.add(addedData);
        expect(collection.length()).toBe(2);
        expect(collection.at(1).toJSON()).toEqual({text: 'two', id: 'two'});

        addedData = {text: 'three', id: 'three'};
        collection.add(addedData);
        expect(collection.length()).toBe(3);
        expect(collection.at(2).toJSON()).toEqual({text: 'three', id: 'three'});
    });

    it('Collection#add(data)はデータをモデルに変換して追加して、changeイベントを発火する', function() {
        var collection = new Collection();
        var addedData;
        collection.on('change', function(event) {
            expect(event.action).toBe('ADD');
            expect(event.changed.toJSON()).toEqual(addedData);
        });

        addedData = {text: 'one', id: 'one'};
        collection.add(addedData);

        addedData = {text: 'two', id: 'two'};
        collection.add(addedData);

        addedData = {text: 'three', id: 'three'};
        collection.add(addedData);
    });
});