'use strict';

var assert = require('power-assert');
var VText = require('./vtext');
var VNode = require('./vnode');

describe('VNode', function() {
    it('vnode.render(name, attributes, text)', function() {
        var div = VNode('div', {id: 'text'}, [ VText('中身') ]);
        assert(div.render() === '<div id="text" >中身</div>');
    });

    it('vnode.render(name, attributes, children)', function() {
        var li = VNode('li', {class: 'item'});
        var ul = VNode('ul', {}, [
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