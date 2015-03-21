'use strict';

var assert = require('power-assert');
var extend = require('./extend');

describe('extend', function() {
    it('extend(a,b)はオブジェクトaにオブジェクトbのプロパティと値を追加し、合成する', function() {
        var a = {a: 1};
        var b = {b: 2};
        assert.deepEqual(extend(a,b), {a:1, b:2});
    });

    it('extend(a,b)はオブジェクトaとオブジェクトbに同じ名前のキーがあった場合、オブジェクトbのプロパティを優先し、上書きする', function() {
        var a = {a: 1, b: 1};
        var b = {b: 2};
        assert.deepEqual(extend(a,b), {a:1, b:2});
    });

    it('extend({},obj)はobjのコピーをつくる', function() {
        var obj = {a: 1, b: 2, c: 3};
        assert.deepEqual(extend({},obj), {a: 1, b: 2, c: 3});
        assert(extend({},obj) !== obj);
    });
});