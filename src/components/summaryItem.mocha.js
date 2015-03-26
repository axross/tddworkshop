'use strict';

var assert = require('power-assert');
var summaryItem = require('./summaryItem');
var createElement = require('../vdom/createElement');
var VText = require('../vdom/vtext');

describe('summaryItem', function() {
    var li = createElement('li');
    var span = createElement('span');

    it('summaryItem(text, num)', function() {
        assert.deepEqual(summaryItem('suites', 16), li({class: 'summary suites'}, [
            VText('suites: '),
            span({}, '16')
        ]));
    });
});