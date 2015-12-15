var mongoose = require('mongoose');
var Task = require('./Project.js');

var UserSchema = new mongoose.Schema({
	username: 		String,
	fullName: 		String,
	password: 		String,
	email: 			String,
	groups: 		[String],
	photo:  		{data: Buffer, contentType: String},
	projects: 		[{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});

module.exports = mongoose.model('User', UserSchema);
