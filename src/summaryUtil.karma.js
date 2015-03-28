'use strict';

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
    it('summaryUtil.passedNumber(list)はisPassedがtrueの要素の数を返す', function() {
        expect(summaryUtil.passedNumber(data)).toBe(7);
    });
    it('summaryUtil.failedNumber(list)はisPassedがfalseの要素の数を返す', function() {
        expect(summaryUtil.failedNumber(data)).toBe(3);
    });
    it('summaryUtil.testNumber(list)はlistの長さを返す', function() {
        expect(summaryUtil.testNumber(data)).toBe(10);
    });
    it('summaryUtil.suiteNumber(list)はtagsの始めの要素の種類の数を返す', function() {
        expect(summaryUtil.suiteNumber(data)).toBe(3);
    });
});