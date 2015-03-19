'use strict';

var Collection = require('./collection');
var View = require('./view');
var todoList = require('./components/todoList');

var testResult = require('../result/mocha.json');
var tests = testResult.passes.map(withPassed(true))
    .concat(testResult.failures.map(withPassed(false)))
    .map(function(item, index) {
        item.id = 'test' + index;
        return item;
    })
    .map(function(item) {
        var tags = item.fullTitle.slice(0, item.fullTitle.length - item.title.length - 1).split(' ');
        item.tags = tags;
        return item;
    });
    console.dir(tests);

function withPassed(isPassed) {
    return function(item) {
        item.isPassed = isPassed;
        return item;
    };
}

var todoListCollection = new Collection(tests);

var todoListView = new View('todolist');

todoListView.delegate('change', '.test-status', function changeStatus(event) {
    var model = todoListCollection.findById(event.target.dataset.id);
    model.set({isPassed: event.target.checked});
});

todoListCollection.on('change', function(event) {
    todoListView.render(todoList(event.target.toJSON()));
});

todoListView.render(todoList(tests));