'use strict';

var $ = require('jquery'),
	debounce = require('lodash.debounce'),
	throttle = require('lodash.throttle');

var _ = {
	debounce: debounce,
	throttle: throttle	
};

$(function() {

	var trigger,
		menu;

	function Menu(ops) {
		this.visible = false;
	}

	Menu.prototype.hide = function() {
		var self = this;
		$('body').removeClass('nav-active');
		this.visible = false;
		setTimeout(function() {
			trigger.hide();
		}, 2000);
	};

	Menu.prototype.show = function() {
		$('body').addClass('nav-active');
		trigger.show();
		this.visible = true;
	};

	Menu.prototype.toggle = function() {
		if (this.visible) {
			this.hide();
		} else {
			this.show();
		}
	};

	function Trigger() {
		this.visible = true;
	}

	Trigger.prototype.hide = function() {
		$('body').removeClass('show-trigger');
		this.visible = false;
	};

	Trigger.prototype.show = function() {
		$('body').addClass('show-trigger');
		this.visible = true;
	};

	trigger = new Trigger();
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

	$('.page-scoper').on('scroll', _.throttle(function() {
		trigger.show();
	}, 250));

	$('.page-scoper').on('scroll', _.debounce(function() {
		setTimeout(function() {
			if (!menu.visible) {
				trigger.hide();
			}
		}, 2000);
	}, 250));
});