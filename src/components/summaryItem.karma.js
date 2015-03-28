'use strict';

var summaryItem = require('./summaryItem');
var createElement = require('../vdom/createElement');
var VText = require('../vdom/vtext');

describe('summaryItem', function() {
    var li = createElement('li');
    var span = createElement('span');

    it('summaryItem(text, num)', function() {
        expect(summaryItem('suites', 16)).toEqual(li({class: 'summary suites'}, [
            VText('suites: '),
            span({}, '16')
        ]));
    });
});