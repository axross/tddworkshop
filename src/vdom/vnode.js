'use strict';

var VText = require('./vtext');
var Attr  = require('./attribute');

var VNode = function(name, attributes, children) {
  this.name     = name;
  this.attr     = new Attr(attributes);
  this.children = children || [VText.empty()];
};

VNode.prototype.render = function() {
  var childrenHTML = this.children
    .map(function(child) {
      return child.render();
    })
    .join('\n');

  return '<' + this.name + ' ' + this.attr.serialize() + ' >' +
           childrenHTML +
         '</' + this.name + '>';
};

var createVNode = function(name, attributes, children) {
  return new VNode(name, attributes, children);
};

module.exports = createVNode;
