'use strict';

var VText = require('./vtext');
var VNode = require('./vnode');
var Attr = require('./attribute');

describe('VNode', function() {
    it('VNode(name, attributes, children)はnameを保持する', function() {
        var div = new VNode('div', {id: 'text'}, [ new VText('中身') ]);
        expect(div.name).toBe('div');
    });

    it('VNode(name, attributes, children)はattributesオブジェクトをAttrとして保持する', function() {
        var div = new VNode('div', {id: 'text'}, [ new VText('中身') ]);
        expect(div.attr).toEqual(new Attr({id: 'text'}));
    });

    it('VNode(name, attributes, children)はchildrenを保持する', function() {
        var div = new VNode('div', {id: 'text'}, [ new VText('中身') ]);
        expect(div.children).toEqual([ new VText('中身') ]);
    });

    it('VNode(name, attributes, children)はchildrenが渡されなければ[VText.empty()]で初期化する', function() {
        var div = new VNode('div', {});
        expect(div.children).toEqual([ VText.empty() ]);
    });

    it('VNode#render()はHTML文字列を返す', function() {
        var div = new VNode('div', {id: 'text'}, [ VText('中身') ]);
        expect(div.render()).toBe('<div id="text" >中身</div>');
    });

    it('VNode#render()はHTML文字列を返す', function() {
        var li = new VNode('li', {class: 'item'});
        var ul = new VNode('ul', {}, [
            li, li, li
        ]);
        expect(ul.render().replace(/[\n, \s]*/g, '')).toBe(
        '<ul>\
            <li class="item"></li>\
            <li class="item"></li>\
            <li class="item"></li>\
            </ul>'.replace(/[\n, \s]*/g, '')
        );
    });
});