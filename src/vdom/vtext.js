'use strict';

var _VText = function(text) {
	this._text = text || '';
};

var VText = function(text) {
	return new _VText(text);
};

_VText.prototype = {
	render:function(){
		return this._text;
	}
};

VText.empty = function(){
	return new VText('');
};

module.exports = VText;
