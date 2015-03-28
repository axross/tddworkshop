'use strict';

var EventEmitter = require('./eventemitter');
var Model = require('./model');

describe('Model', function() {

    it('ModelはEventEmitterをプロトタイプ継承している', function() {
        expect(Model.prototype.on).toBe(EventEmitter.prototype.on);
        expect(Model.prototype.off).toBe(EventEmitter.prototype.off);
        expect(Model.prototype.emit).toBe(EventEmitter.prototype.emit);
    });

    it('ModelのコンストラクタはEventEmitterのコンストラクタを呼び出す', function() {
        var model = new Model();
        //EventEmitterのコンストラクタは_eventsプロパティを{}で初期化する
        expect(model._events).toEqual({});
    });

    it('Modelのコンストラクタは_dataプロパティをコンストラクタ引数のオブジェクトで初期化する', function() {
        var model = new Model({id: 123});
        expect(model._data).toEqual({id: 123});
    });

    it('Modelのコンストラクタは_dataプロパティをコンストラクタ引数がない場合{}で初期化する', function() {
        var model = new Model();
        expect(model._data).toEqual({});
    });

    it('Model#id()はデフォルトでidプロパティの値を返す', function() {
        var model = new Model({id: 123});
        expect(model.id()).toBe(123);
    });

    describe('Model#get(key)', function() {
        it('Model#get(key)は_dataプロパティのkeyの値を返す', function() {
            var model = new Model({message: 'Hello!'});
            expect(model.get('message')).toBe('Hello!');
        });
    
        it('Model#get(key)は_dataプロパティにkeyがなければundefinedを返す', function() {
            var model = new Model({message: 'Hello!'});
            expect(model.get('nothing')).toBe(undefined);
        });
    });

    it('Model#has(key)は_dataプロパティがkeyを持つならtrue、持たないならfalseを返す', function() {
        var model = new Model({message: 'Hello!'});
        expect(model.has('message')).toBe(true);
        expect(model.has('nothing')).toBe(false);
    });

    describe('Model#toJSON()', function() {
        it('Model#toJSON()は_dataプロパティの内容を返す', function() {
            var model = new Model({message: 'Hello!', weather: 'sunny'});
            expect(model.toJSON()).toEqual({message: 'Hello!', weather: 'sunny'});
        });
    
        it('Model#toJSON()は_dataプロパティのコピーを返す', function() {
            var model = new Model({message: 'Hello!', weather: 'sunny'});
            expect(model.toJSON()).toEqual({message: 'Hello!', weather: 'sunny'});
            expect(model.toJSON()).not.toBe(model._data);
        });
    });

    describe('Model#set(data)', function() {

        it('Model#set(data)は_dataプロパティにdataを追加する', function() {
            var model = new Model();
            expect(model.toJSON()).toEqual({});
            model.set({message: 'Hello!'});
            expect(model.get('message')).toBe('Hello!');
            expect(model.toJSON()).toEqual({message: 'Hello!'});
        });

        it('Model#set({key: value})は_dataプロパティのkeyの値をvalueに更新する', function() {
            var model = new Model({message: 'Hello!'});
            expect(model.get('message')).toBe('Hello!');

            model.set({message: 'World!'});
            expect(model.get('message')).toBe('World!');
            expect(model.toJSON()).toEqual({message: 'World!'});
        });

        it('Model#set({key: value})は_dataプロパティに{key:value}を追加する', function() {
            var model = new Model({message: 'Hello!'});
            expect(model.get('message')).toBe('Hello!');
            
            model.set({weather: 'sunny'});
            expect(model.toJSON()).toEqual({message: 'Hello!', weather: 'sunny'});
        });

        it('Model#set(data)はchangeイベントを発火する', function() {
            var model = new Model({message: 'Hello!'});
            var change;
            model.on('change', function() {
                change = 'changeイベントが発火しました';
            });
            model.set({message: 'World!', foo: 'bar'});
            expect(change).toBe('changeイベントが発火しました');
        });

        it('Model#set(data)はchangeイベントハンドラーの引数のイベントオブジェクトのchangedプロパティに、変更されたデータを渡す', function() {
            var model = new Model({message: 'Hello!'});
            model.on('change', function(event) {
                expect(event.changed).toEqual({message: 'World!', foo: 'bar'});
            });
            model.set({message: 'World!', foo: 'bar'});
        });        

        it('Model#set(data)はchangeイベントハンドラーの引数のイベントオブジェクトのtargetプロパティに、変更されたModelオブジェクトを渡す', function() {
            var model = new Model({message: 'Hello!'});
            model.on('change', function(event) {
                expect(event.target).toBe(model);
                expect(event.target.toJSON()).toEqual({message: 'World!', foo: 'bar'});
            });
            model.set({message: 'World!', foo: 'bar'});
        });
    });
});