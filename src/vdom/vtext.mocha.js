'use strict';

var assert = require('power-assert');
var VText = require('./vtext');

describe('VText', function() {
    it('text.render()', function() {
        var text = VText('text');
        assert(text.render() === 'text');
    });

    it('VText.empty()', function() {
        var empty = VText.empty();
        assert.deepEqual(empty, VText(''));
    });
});