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
			markdown: postConfig.markdown,
			issue: postConfig.meta.issue
		});

		if (postConfig.meta.caption) {
			post.set('caption', postConfig.meta.caption);
		}

		listing.addPost(post);
	});

	return listing;
}

function assembleRouteList(listing) {

	var routes = [];

	_.each(listing, function(post) {

		var locals = _.extend({}, {
			post: post,
			pretty: true,
			slug: 'article'
		});

		var templatePath = 'src/views/content/article.pug',
			routeParent = '/dist/blog',
			routeName = post.filename;
			htmlPath = path.join('dist/blog', post.filename);

		routes.push({
			template: templatePaht,
			route: {
				dirname: routeParent,
				filename: routeName,
			
			},
		});

	});

}

var listing = assembleListing().toPlainArray();

function getLocals() {
	return {
		nav: config.nav,
		social: config.social,
		blogroll: listing,
		pretty: true
	};
}

_.each(listing, function(post) {

	var templatePath = 'src/views/content/article.pug',
		htmlPath = path.join('dist/blog', post.filename);

	var locals = _.extend({}, getLocals(), {
		post: post,
		route: 'article',
		showNav: true,
		showTrigger: true
	});

	var html = pug.renderFile(templatePath, locals);

	fse.ensureDirSync('dist/blog');
	fs.writeFileSync(htmlPath, html);
	console.log('Writing file: %s', htmlPath);
});

_.each(config.routes, function(route) {

	var templatePath = path.join('src/views/content/', route.template + '.pug'),
		htmlPath = path.join('dist', route.route + '.html');

	if (!fs.existsSync(templatePath)) {
		throw Error('Could not find template: ' + templatePath);
	}

	var routeContent = config.content[route.route] || {};

	var locals = _.extend({}, getLocals(), routeContent, {
		route: route.route
	});

	var html = pug.renderFile(templatePath, locals);
	fs.writeFileSync(htmlPath, html);
	console.log('Writing file: %s', htmlPath);
});