'use strict';

var todoItem = require('./todoItem');
var createElement = require('../vdom/createElement');

describe('todoItem', function() {
    var li = createElement('li');
    var div = createElement('div');
    var span = createElement('span');
    var h2 = createElement('h2');
    var input = createElement('input');
    var a = createElement('a');

    it('todoItem(item): item.isPassed === trueの場合、inputはchecked="checked" value="true"となる', function() {
        var tree = todoItem({
            id: 'test0',
            title: 'todoItem(item)',
            isPassed: true,
            tags: ['todoItem']
        });
        expect(tree).toEqual(li({class: 'todo-item list-item row'}, [
            div({class: 'pass c1'}, [input({'data-id': 'test0', class: 'test-status', type: 'checkbox', value: true, checked: 'checked'})]),
            div({class: 'suite c3'}, [span({}, 'todoItem')]),
            h2({class: 'c7'}, 'todoItem(item)'),
            div({class: 'c1 button-container'}, [
                a({class: 'button delete', 'data-id': 'test0'}, '×')
            ])
        ]));
    });

    it('todoItem(item): item.isPassed === falseの場合、inputは value="false"となる', function() {
        var tree = todoItem({
            id: 'test0',
            title: 'todoItem(item)',
            isPassed: false,
            tags: ['todoItem']
        });
        expect(tree).toEqual(li({class: 'todo-item list-item row'}, [
            div({class: 'pass c1'}, [input({'data-id': 'test0', class: 'test-status', type: 'checkbox', value: false})]),
            div({class: 'suite c3'}, [span({}, 'todoItem')]),
            h2({class: 'c7'}, 'todoItem(item)'),
            div({class: 'c1 button-container'}, [
                a({class: 'button delete', 'data-id': 'test0'}, '×')
            ])
        ]));
    });
});