var mongoose = require('mongoose');
var Todo = require('./Todo.js');

var ProjectSchema = new mongoose.Schema({
	name: 		String,
	completed: 	Boolean,
	note: 		String,
	updated_at: {type: Date, default: Date.now},
	todo: 		{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'},
});

module.exports = mongoose.model('Project', ProjectSchema);
