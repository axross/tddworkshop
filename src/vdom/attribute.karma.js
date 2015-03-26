'use strict';

var Attr = require('./attribute');

describe('Attr', function() {
    it('attr.serialize()はコンストラクタで保持したオブジェクトをDOM属性形式の文字列でシリアライズする', function() {
        var attr = new Attr({class: 'test', id: 'test'});
        expect(attr.serialize()).toBe('class="test" id="test"');
    });
});