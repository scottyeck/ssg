'use strict';

var $ = require('jquery');

$(function() {
	$('.trigger').on('click', function() {
		$('body').toggleClass('nav-active');
	});
});