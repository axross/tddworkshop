'use strict';

var assert = require('power-assert');
var EventEmitter = require('./eventemitter');
var Model = require('./model');

describe('Model', function() {

    it('ModelはEventEmitterをプロトタイプ継承している', function() {
        assert(Model.prototype.on === EventEmitter.prototype.on);
        assert(Model.prototype.off === EventEmitter.prototype.off);
        assert(Model.prototype.emit === EventEmitter.prototype.emit);
    });

    it('ModelのコンストラクタはEventEmitterのコンストラクタを呼び出す', function() {
        var model = new Model();
        //EventEmitterのコンストラクタは_eventsプロパティを{}で初期化する
        assert.deepEqual(model._events, {});
    });

    it('Modelのコンストラクタは_dataプロパティをコンストラクタ引数のオブジェクトで初期化する', function() {
        var model = new Model({id: 123});
        assert.deepEqual(model._data, {id: 123});
    });

    it('Modelのコンストラクタは_dataプロパティをコンストラクタ引数がない場合{}で初期化する', function() {
        var model = new Model();
        assert.deepEqual(model._data, {});
    });

    it('Model#id()はデフォルトでidプロパティの値を返す', function() {
        var model = new Model({id: 123});
        assert(model.id() === 123);
    });

    describe('Model#get(key)', function() {
        it('Model#get(key)は_dataプロパティのkeyの値を返す', function() {
            var model = new Model({message: 'Hello!'});
            assert(model.get('message') === 'Hello!');
        });
    
        it('Model#get(key)は_dataプロパティにkeyがなければundefinedを返す', function() {
            var model = new Model({message: 'Hello!'});
            assert(model.get('nothing') === undefined);
        });
    });

    it('Model#has(key)は_dataプロパティがkeyを持つならtrue、持たないならfalseを返す', function() {
        var model = new Model({message: 'Hello!'});
        assert(model.has('message') === true);
        assert(model.has('nothing') === false);
    });

    describe('Model#toJSON()', function() {
        it('Model#toJSON()は_dataプロパティの内容を返す', function() {
            var model = new Model({message: 'Hello!', weather: 'sunny'});
            assert.deepEqual(model.toJSON(), {message: 'Hello!', weather: 'sunny'});
        });
    
        it('Model#toJSON()は_dataプロパティのコピーを返す', function() {
            var model = new Model({message: 'Hello!', weather: 'sunny'});
            assert.deepEqual(model.toJSON(), {message: 'Hello!', weather: 'sunny'});
            assert(model.toJSON() !== model._data);
        });
    });

    describe('Model#set(data)', function() {

        it('Model#set(data)は_dataプロパティにdataを追加する', function() {
            var model = new Model();
            assert.deepEqual(model.toJSON(), {});
            model.set({message: 'Hello!'});
            assert(model.get('message') === 'Hello!');
            assert.deepEqual(model.toJSON(), {message: 'Hello!'});
        });

        it('Model#set({key: value})は_dataプロパティのkeyの値をvalueに更新する', function() {
            var model = new Model({message: 'Hello!'});
            assert(model.get('message') === 'Hello!');

            model.set({message: 'World!'});
            assert(model.get('message') === 'World!');
            assert.deepEqual(model.toJSON(), {message: 'World!'});
        });

        it('Model#set({key: value})は_dataプロパティに{key:value}を追加する', function() {
            var model = new Model({message: 'Hello!'});
            assert(model.get('message') === 'Hello!');
            
            model.set({weather: 'sunny'});
            assert.deepEqual(model.toJSON(), {message: 'Hello!', weather: 'sunny'});
        });

        it('Model#set(data)はchangeイベントを発火する', function() {
            var model = new Model({message: 'Hello!'});
            var change;
            model.on('change', function() {
                change = 'changeイベントが発火しました';
            });
            model.set({message: 'World!', foo: 'bar'});
            assert(change === 'changeイベントが発火しました');
        });

        it('Model#set(data)はchangeイベントハンドラーの引数のイベントオブジェクトのchangedプロパティに、変更されたデータを渡す', function() {
            var model = new Model({message: 'Hello!'});
            model.on('change', function(event) {
                assert.deepEqual(event.changed, {message: 'World!', foo: 'bar'});
            });
            model.set({message: 'World!', foo: 'bar'});
        });        

        it('Model#set(data)はchangeイベントハンドラーの引数のイベントオブジェクトのtargetプロパティに、変更されたModelオブジェクトを渡す', function() {
            var model = new Model({message: 'Hello!'});
            model.on('change', function(event) {
                assert(event.target === model);
                assert.deepEqual(event.target.toJSON(), {message: 'World!', foo: 'bar'});
            });
            model.set({message: 'World!', foo: 'bar'});
        });
    });
});