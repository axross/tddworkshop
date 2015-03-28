'use strict';

var VNode = require('./vnode');
var VText = require('./vtext');

var createElement = function(name) {
  var factory = function(attributes, children) {
    if (children == null) children = [];  // null or undefined

    if (Object.prototype.toString.call(children) !== '[object Array]') {
      children = [children];
    }

    if (children.length > 0) {
      children = children.map(function(child) {
        if (typeof child === 'string') return new VText(child);

        return child;
      });
    } else {
      children = [VText.empty()];
    }

    return new VNode(name, attributes, children);
  };

  return factory;
};

module.exports = createElement;
