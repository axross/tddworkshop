'use strict';

function Attr(attributes) {
    if (!this instanceof Attr) {
        return new Attr(attributes);
    }
    this.attributes = attributes || {};
}

Attr.prototype = {
    serialize: function() {
        var attr = this.attributes;
        return Object.keys(attr).map(function(key) {
            var value = attr[key];
            return key + '="' + value + '"'
        }).join(' ');
    }
};

module.exports = Attr;