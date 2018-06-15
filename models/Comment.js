var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var CommentSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	email: {
		type: String
	},
	comment: {
		type: String
	}
});

var Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.createComment = function(newComment, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newComment.comment, salt, function(err, hash) {
	        //newComment.comment = hash;
	        newComment.save(callback);
	    });
	});
};

module.exports.getCommentByUsername = function(username, callback){
	var query = {name: username};
	Comment.findOne(query, callback);
};
