'use strict';

var extend = function(objA, objB) {
  var obj = {};  // returns cloned plain object from objA

  Object.keys(objA).forEach(function(key) {
    obj[key] = objA[key];
  });

  Object.keys(objB).forEach(function(key) {
    obj[key] = objB[key];
  });

  return obj;
};

module.exports = extend;
