'use strict';

var _ 			= require('lodash'),
	dateFormat 	= require('dateformat'),
	GetSet 		= require('get-set');

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validateHref(href) {
	var re = /([a-z]+-){0,5}[a-z]+.html/;
	return re.test(href);
}

var Post = GetSet.interface({
	title:			{ type: 'string', 	required: true },
	date:			{ type: 'date', 	required: true },
	author:			{ type: 'string', 	required: true },
	template:		{ type: 'string', 	required: true },
	html:			{ type: 'string', 	required: true },
	markdown:		{ type: 'string', 	required: true },
	email:			{ type: 'string', 	required: true,		validate: validateEmail },
	filename:		{ type: 'string',	required: false, 	validate: validateHref },
	formattedDate:	{ type: 'string',	required: false }
});

Post.prototype.onConstruct = function() {
	this.setFilename();
	this.setFormattedDate();
};

Post.prototype.setFormattedDate = function() {

	var date = this.get('date'),
		formattedDate = dateFormat(date, 'mmm dd yyyy');

	this.set('formattedDate', formattedDate);
};

Post.prototype.setFilename = function() {
	
	var filename = this.get('title')
		.toLowerCase()
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z-]/g, '') + '.html';

	this.set('filename', filename);
};

module.exports = Post;