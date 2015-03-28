# TDD Workshop [![Circle CI](https://circleci.com/gh/TanUkkii007/tddworkshop.svg?style=shield)](https://circleci.com/gh/TanUkkii007/tddworkshop)
Pedagogical application to learn TDD.

## Motivation

テスト駆動開発の重要性を理解し、必要不可欠なものとして自身のワークフローにしみ込ませることは難しいことです。テスト駆動開発を実際に自分で実践し、開発の数々の問題に直面したときにテストがその問題を回避することを体感してこそ、その真価を理解できるのですから。

このプロジェクトでは既にユニットテストが記述してある状態で、ToDoリストアプリケーションをテストを実行しながら構築します。テスト駆動開発の第一歩として、テストのフィードバックからアプリケーションを徐々に構築していくことに慣れることが目的です。

## Example

以下はentry.jsの抜粋です。

ToDoリストの１アイテムのデータを管理するModel、それを集約管理するCollection、DOMイベントを管理するView、ToDoリストの仮想DOMコンポーネントであるtodoListなどを作っていきます。

```js
var Collection = require('./collection');
var View = require('./view');
var testSummary = require('./components/testSummary');
var todoList = require('./components/todoList');

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

```


## Requirements

+ [gulp](http://gulpjs.com/)
+ [compass](http://compass-style.org/)

```sh
$ npm install --global gulp

$ gem install compass
```

## How To Build

```sh
$ npm run build

```

Then, open index.html.

## TDD workflow

Run "gulp start-hacking". 

```sh
$ gulp start-hacking
```

This will make pre-existing application codes blank and stash them into *.answer.js files. Now you can start to implement the pedagogical app by passing tests one by one.

You can choose karma or mocha, the test framework you will be working with.

```sh
$ gulp karma-tdd

# OR

$ gulp mocha-tdd
```
You can find the test code corresponding with a module in {{MODULE}}.{{FRAMEWORK}}.js file, where MODULE is module name and FRAMEWORK is karma or mocha.


## Known Issue