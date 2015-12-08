var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	// _id: 		Number,		
	name: 		String,
	completed: 	Boolean,
	note: 		String,
	created_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Task', TaskSchema);
