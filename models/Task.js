var mongoose = require('mongoose');
var User = require('./User.js');
var Project = require('./Project.js');

var TaskSchema = new mongoose.Schema({
	name: 			String,
	status: 		String,
	description:	String,
	start_date: 	{type: Date, default: Date.now},

	project:  		{type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
	users: 			[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	
	parent: 		{type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema'},
	subTasks: 		[{type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema'}]
});

module.exports = mongoose.model('Task', TaskSchema);
