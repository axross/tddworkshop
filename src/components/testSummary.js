'use strict';

var createElement 	= require('../vdom/createElement');
var VText 			= require('../vdom/vtext');
var VNode 			= require('../vdom/vnode');
var summaryItem 	= require('./summaryItem');
var summaryUtil 	= require('./summaryUtil');

var testSummary = function(data){
	var ul 		= createElement('ul');
	return ul({},
			[
				summaryItem('failures', summaryUtil.failedNumber(data)),
				summaryItem('passes', summaryUtil.failedNumber(data)),
				summaryItem('tests', summaryUtil.failedNumber(data)),
				summaryItem('suites', summaryUtil.failedNumber(data))
			]
		);
};

module.exports = testSummary;