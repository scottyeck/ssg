'use strict';

var marked = require('meta-marked'),
	glob = require('glob'),
	path = require('path'),
	pug = require('pug'),
	_ = require('lodash'),
	fs = require('fs'),
	fse = require('fs-extra'),
	rfr = require('rfr'),
	GetSet = require('get-set');

var config = rfr('config'),
	Post = rfr('src/lib/post'),
	Listing = rfr('src/lib/listing');

var DIR_NAMES = config.DIR;

function assembleListing() {

	var postSourceFiles = glob.sync(DIR_NAMES.posts + '**/*.md');
	var listing = new Listing();

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

		if (postConfig.meta.caption) {
			post.set('caption', postConfig.meta.caption);
		}

		listing.addPost(post);
	});

	return listing;
}

// function assembleRouteList(listing) {

// 	var routes = [];

// 	_.each(listing, function(post) {

// 		var locals = _.extend({}, post, {
// 			pretty: true
// 		});

// 		var templatePath = 'src/views/content/article.pug',
// 			routeParent = '/dist/blog',
// 			routeName = post.filename;
// 			htmlPath = path.join('dist/blog', post.filename);


// 	});

// }

var listing = assembleListing();

_.each(listing.toPlainArray(), function(post) {

	var templatePath = 'src/views/content/article.pug',
		htmlPath = path.join('dist/blog', post.filename);

	var locals = _.extend({}, {
		post: post,
		pretty: true
	});

	var html = pug.renderFile(templatePath, locals);

	fse.ensureDirSync('dist/blog');
	fs.writeFileSync(htmlPath, html);
	console.log('Writing file: ' + htmlPath);
});