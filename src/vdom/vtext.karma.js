'use strict';

var VText = require('./vtext');

describe('VText', function() {
    it('text.render()はコンストラクタで保持した文字列を返す', function() {
        var text = VText('text');
        expect(text.render()).toBe('text');
    });

    it('VText.empty()は空の文字列を保持するVTextである', function() {
        var empty = VText.empty();
        expect(empty).toEqual(VText(''));
    });
});
