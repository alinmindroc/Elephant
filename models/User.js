var mongoose = require('mongoose');
var Task = require('./Task.js');

var UserSchema = new mongoose.Schema({
	username: 		String,
	fullName: 		String,
	password: 		String,
	email: 			String,
	groups: 		[String],
	photo:  		{data: Buffer, contentType: String},
	projects: 		[{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

module.exports = mongoose.model('User', UserSchema);
