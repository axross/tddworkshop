'use strict';

var createElement = require('../vdom/createElement');
var todoItem = require('./todoItem');

var ul = createElement('ul');

function todoList(items) {
    return ul({clas: 'todo-list'}, items.map(function(item) {
        return todoItem(item);
    }));
}

module.exports = todoList;