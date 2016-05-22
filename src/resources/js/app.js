'use strict';

var $ = require('jquery'),
	debounce = require('lodash.debounce'),
	throttle = require('lodash.throttle');

var _ = {
	debounce: debounce,
	throttle: throttle	
};

$(function() {

	$('.trigger').on('click', function() {
		$('body').toggleClass('nav-active');
	});

	$(window).on('resize', _.throttle(function() {
		$('body').addClass('disable-transition');
	}, 250));

	$(window).on('resize', _.debounce(function() {
		$('body').removeClass('disable-transition');
	}, 250));
});