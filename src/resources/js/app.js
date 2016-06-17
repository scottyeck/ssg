'use strict';

var $ = require('jquery'),
	debounce = require('lodash.debounce'),
	throttle = require('lodash.throttle');

var _ = {
	debounce: debounce,
	throttle: throttle	
};

$(function() {

	var menu;

	function Menu(ops) {
		this.visible = false;
	}

	Menu.prototype.hide = function() {
		$('body').removeClass('nav-active');
		this.visible = false;
	};

	Menu.prototype.show = function() {
		$('body').addClass('nav-active');
		this.visible = true;
	};

	Menu.prototype.toggle = function() {
		if (this.visible) {
			this.hide();
		} else {
			this.show();
		}
	};

	menu = new Menu();

	$('.trigger').on('click', function() {
		menu.toggle();
	});

	$(window).on('resize', _.throttle(function() {
		$('body').addClass('disable-transition');
	}, 250));

	$(window).on('resize', _.debounce(function() {
		$('body').removeClass('disable-transition');
	}, 250));

	window.setTimeout(function() {
		$('body').removeClass('disable-transition');
	}, 750)
});