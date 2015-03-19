'use strict';

var assert = require('power-assert');
var todoList = require('./todoList');
var createElement = require('../vdom/createElement');

describe('todoList', function() {
    var ul = createElement('ul');
    var li = createElement('li');
    var div = createElement('div');
    var span = createElement('span');
    var h2 = createElement('h2');
    var input = createElement('input');

    it('todoList', function() {
        var tree = todoList([
            {id: 'test0', title: 'todoItem(item)', isPassed: true, tags: ['todoItem']},
            {id: 'test1', title: 'todoItem(item)', isPassed: false, tags: ['todoItem']}
        ]);
        assert.deepEqual(tree, ul({clas: 'todo-list'}, [
            li({class: 'todo-item list-item row'}, [
                div({class: 'pass c1'}, [input({'data-id': 'test0', class: 'test-status', type: 'checkbox', value: true, checked: 'checked'})]),
                div({class: 'suite c3'}, [span({}, 'todoItem')]),
                h2({class: 'c8'}, 'todoItem(item)')
            ]),
            li({class: 'todo-item list-item row'}, [
                div({class: 'pass c1'}, [input({'data-id': 'test1', class: 'test-status', type: 'checkbox', value: false})]),
                div({class: 'suite c3'}, [span({}, 'todoItem')]),
                h2({class: 'c8'}, 'todoItem(item)')
            ])
        ]));
    });
});