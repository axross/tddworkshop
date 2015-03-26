'use strict';

var assert = require('power-assert');
var VText = require('./vtext');
var VNode = require('./vnode');
var Attr = require('./attribute');

describe('VNode', function() {
    it('VNode(name, attributes, children)はnameを保持する', function() {
        var div = new VNode('div', {id: 'text'}, [ new VText('中身') ]);
        assert(div.name === 'div');
    });

    it('VNode(name, attributes, children)はattributesオブジェクトをAttrとして保持する', function() {
        var div = new VNode('div', {id: 'text'}, [ new VText('中身') ]);
        assert.deepEqual(div.attr, new Attr({id: 'text'}));
    });

    it('VNode(name, attributes, children)はchildrenを保持する', function() {
        var div = new VNode('div', {id: 'text'}, [ new VText('中身') ]);
        assert.deepEqual(div.children, [ new VText('中身') ]);
    });

    it('VNode(name, attributes, children)はchildrenが渡されなければ[VText.empty()]で初期化する', function() {
        var div = new VNode('div', {});
        assert.deepEqual(div.children, [ VText.empty() ]);
    });

    it('VNode#render()はHTML文字列を返す', function() {
        var div = new VNode('div', {id: 'text'}, [ VText('中身') ]);
        assert(div.render() === '<div id="text" >中身</div>');
    });

    it('VNode#render()はHTML文字列を返す', function() {
        var li = new VNode('li', {class: 'item'});
        var ul = new VNode('ul', {}, [
            li, li, li
        ]);
        assert(ul.render().replace(/[\n, \s]*/g, '') ===
            '<ul>\
            <li class="item"></li>\
            <li class="item"></li>\
            <li class="item"></li>\
            </ul>'.replace(/[\n, \s]*/g, '')
        );
    });
});