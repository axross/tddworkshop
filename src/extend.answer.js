'use strcit';

module.exports = function extend(target, props) {
    for (var key in props) {
        target[key] = props[key];
    }
    return target;
};