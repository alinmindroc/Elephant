var mongoose = require('mongoose');
var Task = require('./Project.js');
var Project = require('./Project.js');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	username: 		String,
	fullName: 		String,
	
	password: 		String,
	email: 			String,
	picturePath:  	String,

	projects: 		[{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
	tasks: 			[{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
