'use strict';

var expect = require('chai').expect,
	rfr = require('rfr'),
	_ = require('lodash');

var Listing = rfr('src/lib/listing'),
	Post = rfr('src/lib/post');

var postConfig = {
	title:		'I\'m a title',
	date:		new Date(),
	author:		'Jane Sample',
	email:		'jane@sample.com',
	template:	'article',
	html:		'<h1>Hello, world!</h1>',
	markdown:	'# Hello, world!'
};

describe('Listing', function() {

	describe('addPost()', function() {

		it('It throws an error if args are invalid.', function() {

			var listing = new Listing();

			expect(function() {
				listing.addPost('Hello, world!');
			}).to.throw();
		});

		it('It adds posts as desired.', function() {

			var listing = new Listing(),
				post = new Post(postConfig);

			listing.addPost(post);
			expect(listing.get('posts')[0]).to.equal(post);
		});
	});

	describe('clearPosts()', function() {

		it('It clears posts as desired.', function() {

			var listing = new Listing(),
				post = new Post(postConfig);

			listing.addPost(post);
			expect(listing.get('posts').length).to.equal(1);

			listing.clearPosts();
			expect(listing.get('posts').length).to.equal(0);
		});
	});

	describe('sort()', function() {

		it('It sorts posts as desired.', function() {

			var listing = new Listing({ sorted: false }),
				older = new Post(postConfig),
				newer = new Post(postConfig);

			older.set('date', new Date(100));
			newer.set('date', new Date(200));

			listing
				.addPost(older)
				.addPost(newer);

			expect(listing.get('posts')[0]).to.equal(older);
			expect(listing.get('posts')[1]).to.equal(newer);

			listing.sort();

			expect(listing.get('posts')[0]).to.equal(newer);
			expect(listing.get('posts')[1]).to.equal(older);
		});
	});
});