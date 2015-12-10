var mongoose = require('mongoose');
var Task = require('./Task.js');

var ProjectSchema = new mongoose.Schema({
	name: 		String,
	status: 	String,
	start_date:	{type: Date, default: Date.now},
	task: 		{type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
});

module.exports = mongoose.model('Project', ProjectSchema);
