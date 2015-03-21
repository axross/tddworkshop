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

//ToDoリストデータ一覧を管理するCollection
var todoListCollection = new Collection(tests);


//ToDoリストの状態を集計して表示するView
var testSummaryView = new View('testSummary');
//Collectionの変更をすべてtestSummaryViewに同期する
todoListCollection.on('change', function(event) {
    testSummaryView.render(testSummary(event.target.toJSON()));
});
//ToDoリストの状態の初期描画
testSummaryView.render(testSummary(todoListCollection.toJSON()));

//ToDoリスト一覧を表示するView
var todoListView = new View('todolist');
//チェックボックスのON/OFF時の変化をModelに通知するイベントハンドラー
todoListView.delegate('change', '.test-status', function changeStatus(event) {
    var model = todoListCollection.findById(event.target.dataset.id);
    model.set({isPassed: event.target.checked});
});
//削除ボタンが押されたときにToDoアイテムをCollectionから削除するイベントハンドラー
todoListView.delegate('click', '.button.delete', function deleteItem(event) {
    var model = todoListCollection.findById(event.target.dataset.id);
    todoListCollection.remove(model);
});
//Collectionの変更をすべてtodoListViewに同期する
todoListCollection.on('change', function(event) {
    todoListView.render(todoList(event.target.toJSON()));
});
//ToDoリストの初期描画
todoListView.render(todoList(tests));


//ToDoアイテムを追加するフォームのView
var todoFormView = new View('todoForm');
//作成ボタンが押されたときにCollectionにアイテムを追加するイベントハンドラー
todoFormView.delegate('click', '.button.create', function(e) {
    var suite = todoFormView.$elm.querySelector('.input-suite').value;
    var title = todoFormView.$elm.querySelector('.input-title').value;
    if (suite.length && title.length) {
        todoListCollection.add({title: title, id: (new Buffer(title)).toString('base64'), tags: [suite], isPassed: false});
    }
});