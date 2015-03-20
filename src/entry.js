'use strict';

var Collection = require('./collection');
var View = require('./view');
var testSummary = require('./components/testSummary');
var todoList = require('./components/todoList');

var testResult = require('../result/mocha.json');
var tests = testResult.passes.map(withPassed(true))
    .concat(testResult.failures.map(withPassed(false)))
    .map(function(item, index) {
        item.id = (new Buffer(item.title)).toString('base64');
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


var testSummaryView = new View('testSummary');
todoListCollection.on('change', function(event) {
    testSummaryView.render(testSummary(event.target.toJSON()));
});
testSummaryView.render(testSummary(todoListCollection.toJSON()));


var todoListView = new View('todolist');

todoListView.delegate('change', '.test-status', function changeStatus(event) {
    var model = todoListCollection.findById(event.target.dataset.id);
    model.set({isPassed: event.target.checked});
});

todoListView.delegate('click', '.button.delete', function deleteItem(event) {
    var model = todoListCollection.findById(event.target.dataset.id);
    todoListCollection.remove(model);
});

var todoFormView = new View('todoForm');
todoFormView.delegate('click', '.button.create', function(e) {
    var suite = todoFormView.$elm.querySelector('.input-suite').value;
    var title = todoFormView.$elm.querySelector('.input-title').value;
    if (suite.length && title.length) {
        todoListCollection.add({title: title, id: (new Buffer(title)).toString('base64'), tags: [suite], isPassed: false});
    }
});


todoListCollection.on('change', function(event) {
    todoListView.render(todoList(event.target.toJSON()));
});

todoListView.render(todoList(tests));