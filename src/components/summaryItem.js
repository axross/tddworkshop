'use strict';

var createElement 	= require('../vdom/createElement');
var VText 			= require('../vdom/vtext');
var VNode 			= require('../vdom/vnode');

var summaryItem = function(text, num){
	var li 		= createElement('li');
	var span 	= createElement('span');
	return li({class: 'summary '+text}, [VText(text+': '),span({},[VText(num+'')])]);
};

module.exports = summaryItem;