var mongoose = require('mongoose');
var User = require('./User.js');

var TaskSchema = new mongoose.Schema({
	name: 			String,
	status: 		String,
	description:	String,
	created_at: 	{type: Date, default: Date.now},
	users: 			[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	children: 		[{type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema'}],
});

module.exports = mongoose.model('Task', TaskSchema);
