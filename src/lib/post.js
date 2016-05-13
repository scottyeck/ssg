'use strict';

var _ = require('lodash'),
	GetSet = require('get-set');

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

var Post = GetSet.interface({
	title:		{ type: 'string', 	required: true },
	date:		{ type: 'date', 	required: true },
	author:		{ type: 'string', 	required: true },
	email:		{ type: 'string', 	required: true,	validate: validateEmail },
	template:	{ type: 'string', 	required: true },
	html:		{ type: 'string', 	required: true },
	markdown:	{ type: 'string', 	required: true }
});

module.exports = Post;