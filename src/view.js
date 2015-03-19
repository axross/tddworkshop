'use strict';

function View(id) {
    this.id = id;
    this.$elm = document.getElementById(id);
}

View.prototype = {
    render: function(vdom) {
        this.$elm.innerHTML = vdom.render();
    },
    delegate: function(eventName, selector, callback) {
        var self = this;
        var handler = function(event) {
            var target = event.target || event.srcElement;
            target.matches = target.matches || target.webkitMatchesSelector;
            while (target && target != self.$elm) {
                if (target.matches(selector)) {
                    callback.call(self, event, self);
                    return;
                }
                target = target.parentNode;
            }
        };
        callback._handler = handler;
        this.$elm.addEventListener(eventName, handler);
    },
    undelegate: function(eventName, callback) {
        this.$elm.removeEventListener(eventName, callback._handler);
    }
};

module.exports = View;