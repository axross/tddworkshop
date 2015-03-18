'use strict';

var VNode = require('./vnode');
var VText = require('./vtext');

function createElement(name) {
    return function(attributes, children) {
        children = children || [ VText.empty() ];
        if (typeof children === 'string') {
            children = [ new VText(children) ];
        }
        if (!Array.isArray(children)) {
            children = [ children ];
        }
        return new VNode(name, attributes, children);
    };
}

module.exports = createElement;