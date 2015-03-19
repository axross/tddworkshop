'use strict';

var assert = require('power-assert');
var summaryUtil = require('./summaryUtil');

describe('summaryUtil', function() {
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
    it('summaryUtil.passedNumber()', function() {
        assert(summaryUtil.passedNumber(data) === 7);
    });
    it('summaryUtil.failedNumber()', function() {
        assert(summaryUtil.failedNumber(data) === 3);
    });
    it('summaryUtil.testNumber()', function() {
        assert(summaryUtil.testNumber(data) === 10);
    });
    it('summaryUtil.suiteNumber()', function() {
        assert(summaryUtil.suiteNumber(data) === 3);
    });
});