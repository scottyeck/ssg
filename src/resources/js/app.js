'use strict';

var $ = require('jquery');

var Nav = require('./components/nav');

$(function() {
	var nav = new Nav({
		$scoper: $('.page-scoper'),
		$header: $('.page-header'),
		$trigger: $('.trigger')
	}).initialize();
});

