'use strict';

var assert = require('power-assert');
var todoItem = require('./todoItem');
var createElement = require('../vdom/createElement');

describe('todoItem', function() {
    var li = createElement('li');
    var div = createElement('div');
    var span = createElement('span');
    var h2 = createElement('h2');
    var input = createElement('input');

    it('todoItem(item): item.isPassed === true', function() {
        var tree = todoItem({
            id: 'test0',
            title: 'todoItem(item)',
            isPassed: true,
            tags: ['todoItem']
        });
        assert.deepEqual(tree, li({class: 'todo-item list-item row'}, [
            div({class: 'pass c1'}, [input({'data-id': 'test0', class: 'test-status', type: 'checkbox', value: true, checked: 'checked'})]),
            div({class: 'suite c3'}, [span({}, 'todoItem')]),
            h2({class: 'c8'}, 'todoItem(item)')
        ]));
    });

    it('todoItem(item): item.isPassed === false', function() {
        var tree = todoItem({
            id: 'test0',
            title: 'todoItem(item)',
            isPassed: false,
            tags: ['todoItem']
        });
        assert.deepEqual(tree, li({class: 'todo-item list-item row'}, [
            div({class: 'pass c1'}, [input({'data-id': 'test0', class: 'test-status', type: 'checkbox', value: false})]),
            div({class: 'suite c3'}, [span({}, 'todoItem')]),
            h2({class: 'c8'}, 'todoItem(item)')
        ]));
    });
});