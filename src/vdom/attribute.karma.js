'use strict';

var Attr = require('./attribute');

describe('Attr', function() {
    it('attr.serialize', function() {
        var attr = new Attr({class: 'test', id: 'test'});
        expect(attr.serialize()).toBe('class="test" id="test"');
    });
});