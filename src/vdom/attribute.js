'use strict';

var Attr = function(data) {
  this._data = data;
};

Attr.prototype.serialize = function() {
  return Object.keys(this._data)
    .map(function(key) {
      return key + '="' + this._data[key] + '"';
    }, this)
    .join(' ');
};

module.exports = Attr;
