'use strict';

var summaryItem = require('./summaryItem');
var createElement = require('../vdom/createElement');
var summaryUtil = require('../summaryUtil');

var ul = createElement('ul');

function testSummary(list) {
    return ul({}, [
        summaryItem('failures', summaryUtil.failedNumber(list)),
        summaryItem('passes', summaryUtil.passedNumber(list)),
        summaryItem('tests', summaryUtil.testNumber(list)),
        summaryItem('suites', summaryUtil.suiteNumber(list))
    ]);
}

module.exports = testSummary;