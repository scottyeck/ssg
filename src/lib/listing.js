'use strict';

var _ = require('lodash');

var GetSet = require('get-set'),
	Post = require('./post');

var Listing = GetSet.interface({
	posts: { type: 'array', default: new Array() },
	sorted: { type: 'boolean', default: false }
});

Listing.prototype.addPost = function(post, ops) {

	ops = ops || {};
	ops.disableSort = (_.isUndefined(ops.disableSort) || false);

	if (!(post instanceof Post)) {
		throw Error('Method `addPost` expected arg `post` to be instance of `Post` but received ' + post);
	}

	this.get('posts').push(post);

	if (!ops.disableSort) {
		this.sort();
	}

	return this;
};

Listing.prototype.addPosts = function(postList) {

	var self = this;
	_.each(postList, function(post) {
		self.addPost(post, { disableSort: true });
	});

	this.sort();
	return this;
};

Listing.prototype.clearPosts = function() {
	this.set('posts', []);
	return this;
};

Listing.prototype.sort = function() {
	var sorted = _.sortBy(this.get('posts'), function(post) {
		return post.get('date') * -1;
	});
	this.set('posts', sorted);
	return this;
};

Listing.prototype.toPlainArray = function() {
	return _.map(this.get('posts'), function(post) {
		return post.toPlainObj();
	});
};

module.exports = Listing;