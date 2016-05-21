'use strict';

var $ = require('jquery');

function Nav(ops) {
	ops = ops || {};
	
	if (!ops.$scoper || !ops.$scoper instanceof $ || ops.$scoper.length < 1) {
		throw Error('Initialization of component nav requires arg `ops` to have non-empty config field `$scoper` whose value is a non-empty jQuery element, but received '+ ops.$scoper);
	}
	if (!ops.$header || !ops.$header instanceof $ || ops.$header.length < 1) {
		throw Error('Initialization of component nav requires arg `ops` to have non-empty config field `$header` whose value is a non-empty jQuery element, but received '+ ops.$header);
	}
	if (!ops.$trigger || !ops.$trigger instanceof $ || ops.$trigger.length < 1) {
		throw Error('Initialization of component nav requires arg `ops` to have non-empty config field `$trigger` whose value is a non-empty jQuery element, but received '+ ops.$trigger);
	}
	if ((typeof ops.visible !== 'undefined') && (typeof ops.visible !== 'boolean')) {
		throw Error('Initialization of component nav requires arg `ops` to have optional config field `visible` whose value, if present, is a boolean, but received '+ ops.visible);	
	}

	this.visible = (typeof ops.visible !== 'undefined') ? ops.visible : false;
	this.$scoper = ops.$scoper;
	this.$header = ops.$header;
	this.$trigger = ops.$trigger;
}

Nav.prototype.getMeasures = function() {

	var headerHeight = this.$header.outerHeight();
	var scoperPaddingTop = parseInt(this.$scoper.css('padding-top'));

	return {
		header: {
			height: headerHeight
		},
		scoper: {
			paddingTop: scoperPaddingTop
		}
	};
};

Nav.prototype.initialize = function() {
	var self = this;
	this.$trigger.on('click', function() {
		self.toggle();
	});
	this.renderState();
	return this;
};

Nav.prototype.renderState = function() {
	if (this.visible) {
		this.show();
	} else {
		this.hide();
	}
	return this;
};

Nav.prototype.toggle = function() {
	if (this.visible) {
		this.hide();
	} else {
		this.show();
	}
	return this;
};

Nav.prototype.show = function() {

	var measures = this.getMeasures();
	this.$header.css({ 'top': 0 });
	this.$scoper.css({ 'padding-top': measures.scoper.paddingTop + measures.header.height });

	this.visible = true;
	return this;
};

Nav.prototype.hide = function() {

	var measures = this.getMeasures();
	this.$header.css({ 'top': measures.header.height * -1 });
	this.$scoper.attr('style', '');

	this.visible = false;
	return this;
};

module.exports = Nav;