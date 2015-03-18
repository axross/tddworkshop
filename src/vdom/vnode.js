'use strict';

var Attr = require('./attribute');
var VText = require('./vtext');

function VNode(name, attributes, children) {
    if (this instanceof VNode === false) {
        return new VNode(name, attributes, children);
    }
    this.name = name;
    this.attr = new Attr(attributes);
    this.children = children || [ VText.empty() ];
}

VNode.prototype = {
    render: function() {
        var start = ['<' + this.name, this.attr.serialize(), '>'].join(' ');
    
        var children = this.children.map(function(c) {
            return c.render();
        }).join('\n');
        
        var end = '</' + this.name + '>';
        return start + children + end;
    }
};

module.exports = VNode;