'use strict';

var createElement = require('../vdom/createElement');
var VText = require('../vdom/vtext');
var li = createElement('li');
var span = createElement('span');

function summaryItem(type, num) {
    return li({class: 'summary ' + type}, [
        VText(type + ': '),
        span({}, String(num))
    ]);
}

module.exports = summaryItem;