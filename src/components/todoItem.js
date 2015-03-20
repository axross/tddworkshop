'use strict';

var createElement = require('../vdom/createElement');

var li = createElement('li');
var div = createElement('div');
var span = createElement('span');
var h2 = createElement('h2');
var input = createElement('input');
var a = createElement('a');

var todoItem = function(item) {
    var checkbox = {'data-id': item.id, class: 'test-status', type: 'checkbox', value: item.isPassed};
    if (item.isPassed) {
        checkbox['checked'] = 'checked';
    }
    return li({class: 'todo-item list-item row'}, [
        div({class: 'pass c1'}, [input(checkbox)]),
        div({class: 'suite c3'}, item.tags.map(function(t) {
            return span({}, t);
        })),
        h2({class: 'c7'}, item.title),
        div({class: 'c1 button-container'}, [
            a({class: 'button delete', 'data-id': item.id}, '×')
        ])
    ]);
};

module.exports = todoItem;

