'use strict';

var testSummary = require('./testSummary');
var summaryItem = require('./summaryItem');
var createElement = require('../vdom/createElement');
var VText = require('../vdom/vtext');
var summaryUtil = require('../summaryUtil');

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

    it('testSummary(data)はdataを集計してsummaryItemのリストとして表示する', function() {
        expect(testSummary(data)).toEqual(ul({}, [
            summaryItem('failures', summaryUtil.failedNumber(data)),
            summaryItem('passes', summaryUtil.passedNumber(data)),
            summaryItem('tests', summaryUtil.testNumber(data)),
            summaryItem('suites', summaryUtil.suiteNumber(data))
        ]));
    });
});