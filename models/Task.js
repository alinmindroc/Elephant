var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	name: 			String,
	completed: 		Boolean,
	description:	String,
	created_at: 	{type: Date, default: Date.now},
});

module.exports = mongoose.model('Task', TaskSchema);
