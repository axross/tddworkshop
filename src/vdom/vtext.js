'use strict';

var VText = function(text) {
    if (this instanceof VText === false) {
        return new VText(text);
    }
    this.text = text;
};

VText.prototype = {
    render: function() {
        //Todo escape & isolate
        return this.text;
    }
};

VText.empty = function() {
    return new VText('');
};

module.exports = VText;