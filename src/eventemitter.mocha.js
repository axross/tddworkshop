'use strict';

var assert = require('power-assert');
var expect = require('expect.js');
var EventEmitter = require('./eventemitter');

describe('EventEmitter', function() {

    it('new EventEmitter()で作られるオブジェクトは_eventsプロパティを{}で初期化する', function() {
        var event = new EventEmitter();
        assert.deepEqual(event._events, {});
    });

    describe('EventEmitter#on(name, callback)', function() {
        
        it('EventEmitter#on(name, callback)は_events[name]を配列で初期化する', function() {
            var event = new EventEmitter();
            function test() {}
            event.on('test', test);
            expect(event._events['test']).to.be.an('array');
        });

        it('EventEmitter#on(name, callback)は_events[name]にcallbackを追加する', function() {
            var event = new EventEmitter();
            function test() {}

            event.on('test', test);
            assert.deepEqual(event._events['test'], [test]);
            event.on('test', test);
            assert.deepEqual(event._events['test'], [test, test]);
            event.on('test', test);
            assert.deepEqual(event._events['test'], [test, test, test]);
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
            assert(message === '確かにmessage1が呼ばれた');
            //event.emit('test2')がmessage2を呼び出すことを確認
            event.emit('test2');
            assert(message === '確かにmessage2が呼ばれた');
        });
    
        it('EventEmitter#emit(name, arg)はonで登録したリスナーをargを引数として呼び出す', function() {
            var event = new EventEmitter();
    
            event.on('test', function(e) {
                assert.deepEqual(e, {test: 'Hello'});
            });
            event.emit('test', {test: 'Hello'});
        });

        it('EventEmitter#emit(name, arg)はonで登録したnameイベントのリスナーすべてを呼び出す', function() {
            var event = new EventEmitter();
    
            event.on('test', function(e) {
                assert.deepEqual(e, {test: 'Hello'});
            });
            event.on('test', function(e) {
                assert.deepEqual(e, {test: 'Hello'});
            });
            event.on('test', function(e) {
                assert.deepEqual(e, {test: 'Hello'});
            });
            assert(event._events['test'].length === 3);
            event.emit('test', {test: 'Hello'});
        });

        it('EventEmitter#emit(name, arg)はonで登録したリスナーを、EventEmitterオブジェクトをthisとして呼び出す', function() {
            var event = new EventEmitter();
    
            event.on('test', function() {
                assert(this === event);
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
            assert.deepEqual(event._events['test'], [test]);
            event.on('test', test);
            assert.deepEqual(event._events['test'], [test, test]);
            event.on('test', test);
            assert.deepEqual(event._events['test'], [test, test, test]);

            event.off('test', test);
            assert.deepEqual(event._events['test'], [test, test]);
            event.off('test', test);
            assert.deepEqual(event._events['test'], [test]);
            event.off('test', test);
            assert.deepEqual(event._events['test'], []);
        });

        it('EventEmitter#off(name, callback)で登録を解除したcallbackはemit(name)で呼ばれない', function() {
            var event = new EventEmitter();
    
            var fail = function() {
                expect.fail('このイベントハンドラーはoffで取り除かれるので、呼ばれてはならない');
            };
    
            event.emit('test');
            event.on('test', fail);
            event.off('test', fail);
            event.emit('test');
        });
    });
});