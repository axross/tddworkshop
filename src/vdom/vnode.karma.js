'use strict';

var VNode = require('./vnode');
var VText = require('./vtext');

describe('VNode', function() {
    it('vnode.render(name, attributes, text)', function() {
        var div = VNode('div', {id: 'text'}, [ VText('中身') ]);
        expect(div.render()).toBe('<div id="text" >中身</div>');
    });

    it('vnode.render', function() {
        var li = VNode('li', {class: 'item'});
        var ul = VNode('ul', {}, [
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