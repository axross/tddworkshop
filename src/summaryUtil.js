'use strict';

var SummaryUtil = {
	passedNumber:function(list){
		return list.filter(function(data){
			return data.isPassed;
		}).length;
	},
	failedNumber:function(list){
		return list.filter(function(data){
			return !data.isPassed;
		}).length;
	},
	testNumber:function(list){
		return list.length;
	},
	suiteNumber:function(list){
		return list.map(function(data){
			return data.tags[0];
		}).filter(function(val, i, arr){
			return (i <= arr.indexOf(val));
		}).length;
	}
};

module.exports = SummaryUtil;