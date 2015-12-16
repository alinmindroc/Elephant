var mongoose = require('mongoose');
var Task = require('./Task.js');
var User = require('./User.js');

var ProjectSchema = new mongoose.Schema({
	name: 		String,
	status: 	String,
	start_date:	{type: Date, default: Date.now},
	tasks: 		[{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
	users: 		[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Project', ProjectSchema);
