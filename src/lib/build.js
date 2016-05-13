'use strict';

var marked = require('meta-marked'),
	glob = require('glob'),
	_ = require('lodash'),
	fs = require('fs'),
	rfr = require('rfr'),
	GetSet = require('get-set');

var config = rfr('config'),
	Post = rfr('src/lib/post');

var DIR_NAMES = config.DIR;

var postSourceFiles = glob.sync(DIR_NAMES.posts + '**/*.md');

_.each(postSourceFiles, function(fileName) {

	var postSource = fs.readFileSync(fileName, { encoding: 'utf-8'});
	var postConfig = marked(postSource);

	var post = new Post({
		title: postConfig.meta.title,
		date: new Date(postConfig.meta.date),
		author: postConfig.meta.author,
		email: postConfig.meta.email,
		template: postConfig.meta.template,
		html: postConfig.html,
		markdown: postConfig.markdown
	});	
});