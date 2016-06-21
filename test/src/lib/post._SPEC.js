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

		it('It should automatically truncate a summary when it contains a codeblock before the 30th word.', function() {

			var shortPost = new Post({
				title: 'Hello world again!',
				date: new Date(),
				author: 'Scotty Eckenthal',
				template: 'article',
				html: '<p>This is my article</p><pre><code class="lang-js">var foo = true;</code></pre>',
				markdown: 'This is my article\n```js\nvar foo = true;```',
				email: 'scott.eckenthal@gmail.com'
			});

			expect(shortPost.get('summary')).to.equal('<p>This is my article</p>\n');

			var longPost = new Post({
				title: 'Hello world again!',
				date: new Date(),
				author: 'Scotty Eckenthal',
				template: 'article',
				html: '<p>This is my article</p><pre><code class="lang-js">var foo = true;</code></pre>',
				markdown: 'This is my considerably longer article. This is my considerably longer article. This is my considerably longer article. This is my considerably longer article. This is my considerably longer article. This is my considerably longer article.\n```js\nvar foo = true;```',
				email: 'scott.eckenthal@gmail.com'
			});

			expect(longPost.get('summary').indexOf('<code>')).to.equal(-1);
		});
	});
});