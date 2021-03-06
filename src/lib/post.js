'use strict';

var _ 			= require('lodash'),
	path		= require('path'),
	dateFormat 	= require('dateformat'),
	marked		= require('meta-marked'),
	GetSet 		= require('get-set');

var Post;

marked.noMeta.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validateHref(href) {
	var re = /([a-z]+-){0,5}[a-z]+.html/;
	return re.test(href);
}

function validateIssueUrl(url) {
	var re = /^http(s)*:\/\/github\.com\/([a-z]+\/){2}issues\/\d+$/;
    return re.test(url);
}

function validatePost(post) {
	return post instanceof Post;
}

Post = GetSet.interface({
	title:			{ type: 'string', 	required: true },
	date:			{ type: 'date', 	required: true },
	author:			{ type: 'string', 	required: true },
	template:		{ type: 'string', 	required: true },
	html:			{ type: 'string', 	required: true },
	markdown:		{ type: 'string', 	required: true },
	email:			{ type: 'string', 	required: true,		validate: validateEmail },
	filename:		{ type: 'string',	required: false, 	validate: validateHref },
	formattedDate:	{ type: 'string',	required: false },
	summary:		{ type: 'string',	required: false },
	href:			{ type: 'string',	required: false },
	issue:			{ type: 'number',	required: true 	},
	issueUrl:		{ type: 'string',	required: false,	validate: validateIssueUrl },
	contributors:	{ type: 'array',	required: true },
	previous:		{ type: 'object', 	required: false,	validate: validatePost },
	next:			{ type: 'object', 	required: false,	validate: validatePost },
});

Post.prototype.onConstruct = function() {
	this.setFilename();
	this.setFormattedDate();
	this.setSummary();
	this.setIssueUrl();
	this.handleContributors();
};

Post.prototype.setIssueUrl = function() {
	var issueNum = this.get('issue').toString(),
		issueUrl = 'https://github.com/scottyeck/blog/issues/' + issueNum;

	this.set('issueUrl', issueUrl);
};

Post.prototype.handleContributors = function() {

	var contributors = this.get('contributors').slice(),
		re = /^([a-zA-Z]+\s)+\<@[a-zA-Z\d\_\-]+\>$/;

	var result = [];

	_.each(contributors, function(contributor) {

		if (!re.test(contributor)) {
			throw Error('TODO');
		}

		var name = contributor.replace(/<@[a-zA-Z\d\_\-]+\>/, '').trim(),
			username = contributor.replace(/^[^@]+|@|>$/g, '').trim();

		result.push({
			name: name,
			username: '@' + username,
			url: '//github.com/' + username
		});
	});

	this.set('contributors', result);
};

Post.prototype.setSummary = function() {
	var md = this.get('markdown');
	var summary = md.split(' ').slice(0, 30).join(' ') + '...';

	/*
	 * Truncate if it contains a codeblock.
	 */
	var codeBlockIdx = summary.indexOf('```');
	if (codeBlockIdx > -1) {
		summary = summary.substring(0, codeBlockIdx);
	}

	this.set('summary', marked(summary).html);
};

Post.prototype.setFormattedDate = function() {

	var date = this.get('date'),
		formattedDate = dateFormat(date, 'mmm dd yyyy');

	this.set('formattedDate', formattedDate);
};

Post.prototype.setFilename = function() {
	
	var slug = this.get('title')
		.toLowerCase()
		.replace(/-/g, '')
		.split(' ')
		.slice(0, 6)
		.filter(function(entry) {
			return entry != '';
		})
		.join('-')
		.replace(/[^a-zA-Z-]/g, '');

	this.set('filename', slug + '.html');
	this.set('href', path.join('/blog/', slug));
};

module.exports = Post;