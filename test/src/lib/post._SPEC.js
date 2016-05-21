'use strict';

var expect = require('chai').expect,
	rfr = require('rfr');

var Post = rfr('src/lib/post');

describe('Post', function() {

	describe('[constructor]', function() {

		it('It should automatically set a filename field.', function() {

			var post = new Post({
				title: 'Hello world again!',
				date: new Date(),
				author: 'Scotty Eckenthal',
				template: 'article',
				html: '<p>This is my article</p>',
				markdown: 'This is my article',
				email: 'scott.eckenthal@gmail.com'
			});

			expect(post.get('filename')).to.equal('hello-world-again.html');
		});
	});
});