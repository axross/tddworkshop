'use strict';

var assert = require('power-assert');
var extend = require('./extend');

describe('extend', function() {
    it('extend(a,b)', function() {
        var a = {a: 1};
        var b = {b: 2};
        assert.deepEqual(extend(a,b), {a:1, b:2});
    });

    it('extend({},obj)', function() {
        var obj = {a: 1, b: 2, c: 3};
        assert.deepEqual(extend({},obj), {a: 1, b: 2, c: 3});
        assert(extend({},obj) !== obj);
    });
});