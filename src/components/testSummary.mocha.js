'use strict';

var assert = require('power-assert');
var testSummary = require('./testSummary');
var summaryItem = require('./summaryItem');
var createElement = require('../vdom/createElement');
var VText = require('../vdom/vtext');

describe('testSummary', function() {
    var ul = createElement('ul');

    var data = [
        {title: 'test1', isPassed: true, tags: ['testA']},
        {title: 'test2', isPassed: true, tags: ['testA']},
        {title: 'test3', isPassed: false, tags: ['testA']},
        {title: 'test4', isPassed: true, tags: ['testB']},
        {title: 'test5', isPassed: true, tags: ['testB']},
        {title: 'test6', isPassed: false, tags: ['testC']},
        {title: 'test7', isPassed: true, tags: ['testC']},
        {title: 'test8', isPassed: true, tags: ['testC']},
        {title: 'test9', isPassed: false, tags: ['testC']},
        {title: 'test10', isPassed: true, tags: ['testC']}
    ];

    it('testSummary', function() {
        assert.deepEqual(testSummary(data), ul({}, [
            summaryItem('failures', 3),
            summaryItem('passes', 7),
            summaryItem('tests', 10),
            summaryItem('suites', 3)
        ]));
    });
});