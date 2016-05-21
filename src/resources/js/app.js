'use strict';

var $ = require('jquery');

var $scoper = $('.page-scoper'),
	$header = $('.page-header');

function Nav() {
	this.visible = false;
}

Nav.prototype.toggle = function() {
	if (this.visible) {
		this.hide();
	} else {
		this.show();
	}
};

Nav.prototype.show = function() {

	var headerHeight = $header.outerHeight;
	$header.css({ 'top': 0 });
	$scoper.css({ 'padding-top': 123 })

	this.visible = true;
};

Nav.prototype.hide = function() {

	$header.css({ 'top': -75 });
	$scoper.css({ 'padding-top': 48 });

	this.visible = false;
};

window.nav = new Nav();