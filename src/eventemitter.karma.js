'use strict';

var EventEmitter = require('./eventemitter');

describe('EventEmitter', function() {

    it('new EventEmitter()で作られるオブジェクトは_eventsプロパティを{}で初期化する', function() {
        var event = new EventEmitter();
        expect(event._events).toEqual({});
    });

    describe('EventEmitter#on(name, callback)', function() {
        
        it('EventEmitter#on(name, callback)は_events[name]を配列で初期化する', function() {
            var event = new EventEmitter();
            function test() {}
            event.on('test', test);
            expect(Array.isArray(event._events['test'])).toBe(true);
        });

        it('EventEmitter#on(name, callback)は_events[name]にcallbackを追加する', function() {
            var event = new EventEmitter();
            function test() {}

            event.on('test', test);
            expect(event._events['test']).toEqual([test]);
            event.on('test', test);
            expect(event._events['test']).toEqual([test, test]);
            event.on('test', test);
            expect(event._events['test']).toEqual([test, test, test]);
        });
    });

    describe('EventEmitter#emit(name, arg)', function() {

        it('EventEmitter#emit(name, arg)はリスナーがなければなにもしない', function() {
            var event = new EventEmitter();
    
            //リスナーがないときも動くことの確認
            event.emit('test', {test: 'Hello'});
        });
    
        it('EventEmitter#emit(name, arg)はonで登録したnameイベントのリスナーを呼び出す', function() {
            var event = new EventEmitter();
            var message = '';

            event.on('test1', function message1() {
                message = '確かにmessage1が呼ばれた';
            });
            event.on('test2', function message2() {
                message = '確かにmessage2が呼ばれた';
            });

            //event.emit('test1')がmessage1を呼び出すことを確認
            event.emit('test1');
            expect(message).toBe('確かにmessage1が呼ばれた');
            //event.emit('test2')がmessage2を呼び出すことを確認
            event.emit('test2');
            expect(message).toBe('確かにmessage2が呼ばれた');
        });
    
        it('EventEmitter#emit(name, arg)はonで登録したリスナーをargを引数として呼び出す', function() {
            var event = new EventEmitter();
    
            event.on('test', function(e) {
                expect(e, {test: 'Hello'});
            });
            event.emit('test', {test: 'Hello'});
        });

        it('EventEmitter#emit(name, arg)はonで登録したnameイベントのリスナーすべてを呼び出す', function() {
            var event = new EventEmitter();
    
            event.on('test', function(e) {
                expect(e, {test: 'Hello'});
            });
            event.on('test', function(e) {
                expect(e, {test: 'Hello'});
            });
            event.on('test', function(e) {
                expect(e, {test: 'Hello'});
            });
            expect(event._events['test'].length).toBe(3);
            event.emit('test', {test: 'Hello'});
        });

        it('EventEmitter#emit(name, arg)はonで登録したリスナーを、EventEmitterオブジェクトをthisとして呼び出す', function() {
            var event = new EventEmitter();
    
            event.on('test', function() {
                expect(this).toBe(event);
            });
            event.emit('test');
        });
    });

    describe('EventEmitter#off(name, callback)', function() {

        it('EventEmitter#off(name, callback)はイベントリスナーが登録されてなければなにもしない', function() {
            var event = new EventEmitter();
    
            function test() {}
    
            event.off('test', test);
            event.emit('test');
        });    
        
        it('EventEmitter#off(name, callback)はonで登録したcallbackを_events[name]から取り除く', function() {
            var event = new EventEmitter();
    
            function test() {}

            event.on('test', test);
            expect(event._events['test']).toEqual([test]);
            event.on('test', test);
            expect(event._events['test']).toEqual([test, test]);
            event.on('test', test);
            expect(event._events['test']).toEqual([test, test, test]);

            event.off('test', test);
            expect(event._events['test']).toEqual([test, test]);
            event.off('test', test);
            expect(event._events['test']).toEqual([test]);
            event.off('test', test);
            expect(event._events['test']).toEqual([]);
        });

        it('EventEmitter#off(name, callback)で登録を解除したcallbackはemit(name)で呼ばれない', function() {
            var event = new EventEmitter();
    
            var fail = function() {
                throw new Error('このイベントハンドラーはoffで取り除かれるので、呼ばれてはならない');
            };
    
            event.emit('test');
            event.on('test', fail);
            event.off('test', fail);
            event.emit('test');
        });
    });
});