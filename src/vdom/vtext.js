'use strict';

var VText = function(text){
	if (this instanceof VText === false)
		return new VText(text);
	this._text = (typeof text !== 'undefined') ? text:'';
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