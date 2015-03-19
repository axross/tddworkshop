'use strict';


function passedNumber(list) {
    return list.filter(function(item) {
        return item.isPassed;
    }).length;
}

function failedNumber(list) {
    return list.filter(function(item) {
        return !item.isPassed;
    }).length;
}

function testNumber(list) {
    return list.length;
}

function suiteNumber(list) {
    return list.map(function(item) {
        return item.tags[0];
    }).reduce(function(acc, tag) {
        if (acc.indexOf(tag) === -1) {
            acc.push(tag);
        }
        return acc;
    }, []).length;
}


module.exports = {
    passedNumber: passedNumber,
    failedNumber: failedNumber,
    testNumber: testNumber,
    suiteNumber: suiteNumber
};