'use strict';

var todoList = require('./todoList');
var todoItem = require('./todoItem');
var createElement = require('../vdom/createElement');

describe('todoList', function() {
    var ul = createElement('ul');

    it('todoListはtodoItemのリストである', function() {
        var list = [
            {id: 'test0', title: 'todoItem(item)', isPassed: true, tags: ['todoItem']},
            {id: 'test1', title: 'todoItem(item)', isPassed: false, tags: ['todoItem']}
        ];
        var tree = todoList(list);
        expect(tree).toEqual(ul({clas: 'todo-list'}, [
            todoItem(list[0]),
            todoItem(list[1])
        ]));
    });
});