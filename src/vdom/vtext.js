'use strict';

var _VText = function() {};

var VText = function(text) {
  return new _VText(text);
};

VText.prototype = {
	render:function(){
		return this._text;
	}
};

VText.empty = function(){
	return new VText('');
};

module.exports = VText;
