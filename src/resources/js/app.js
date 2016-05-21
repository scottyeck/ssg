'use strict';

var $ = require('jquery');

function Nav(ops) {
	ops = ops || {};
	this.visible = false;

	if (!ops.$scoper || !ops.$scoper instanceof $ || ops.$scoper.length < 1) {
		throw Error('Initialization of component nav requires arg `ops` to have non-empty config field `$scoper` whose value is a non-empty jQuery element, but received '+ ops.$scoper);
	}
	if (!ops.$header || !ops.$header instanceof $ || ops.$header.length < 1) {
		throw Error('Initialization of component nav requires arg `ops` to have non-empty config field `$header` whose value is a non-empty jQuery element, but received '+ ops.$header);
	}
	if (!ops.$trigger || !ops.$trigger instanceof $ || ops.$trigger.length < 1) {
		throw Error('Initialization of component nav requires arg `ops` to have non-empty config field `$trigger` whose value is a non-empty jQuery element, but received '+ ops.$trigger);
	}

	this.$scoper = ops.$scoper;
	this.$header = ops.$header;
	this.$trigger = ops.$trigger;
}

Nav.prototype.initialize = function() {
	var self = this;
	this.$trigger.on('click', function() {
		self.toggle();
	});
	return this;
}

Nav.prototype.toggle = function() {
	if (this.visible) {
		this.hide();
	} else {
		this.show();
	}
	return this;
};

Nav.prototype.show = function() {

	var headerHeight = this.$header.outerHeight;
	this.$header.css({ 'top': 0 });
	this.$scoper.css({ 'padding-top': 123 })

	this.visible = true;
	return this;
};

Nav.prototype.hide = function() {
	this.$header.css({ 'top': -75 });
	this.$scoper.css({ 'padding-top': 48 });

	this.visible = false;
	return this;
};

$(function() {
	var nav = new Nav({
		$scoper: $('.page-scoper'),
		$header: $('.page-header'),
		$trigger: $('.trigger')
	}).initialize();
});

