'use strict';

var assert = require('power-assert');
var VNode = require('./vnode');
var VText = require('./vtext');
var createElement = require('./createElement');

describe('createElement', function() {
    it('createElement(name)', function() {
        var div = createElement('div');
        assert.deepEqual(div({id: 'hoge'}, 'text'), VNode('div', {id: 'hoge'}, [ VText('text') ]));
    });

    it('createElement(name)', function() {
        var img = createElement('img');
        assert.deepEqual(img({src: 'hoge'}), VNode('img', {src: 'hoge'}, [ VText('') ]));
    });
});