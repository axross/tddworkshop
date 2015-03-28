'use strict';

var VNode = require('./vnode');
var VText = require('./vtext');
var createElement = require('./createElement');

describe('createElement', function() {
    it('createElement(name)はnameを名前に持つVNodeを作るファクトリー関数をつくる', function() {
        var div = createElement('div');
        expect(div({id: 'hoge'}, [ VText('text') ])).toEqual(VNode('div', {id: 'hoge'}, [ VText('text') ]));
    });

    it('createElement(name)で作った関数はchildrenが配列でない場合、配列にする', function() {
        var div = createElement('div');
        expect(div({id: 'hoge'}, VText('text'))).toEqual(VNode('div', {id: 'hoge'}, [ VText('text') ]));
    });

    it('createElement(name)で作った関数はchildrenが文字列の場合、VTextの配列にする', function() {
        var div = createElement('div');
        expect(div({id: 'hoge'}, 'text')).toEqual(VNode('div', {id: 'hoge'}, [ VText('text') ]));
    });

    it('createElement(name)で作った関数はchildrenが指定されない場合、VText.empty()の配列にする', function() {
        var img = createElement('img');
        expect(img({src: 'hoge'})).toEqual(VNode('img', {src: 'hoge'}, [ VText('') ]));
    });
});