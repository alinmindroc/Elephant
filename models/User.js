var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: 		String,
	fillname: 		String,
	password: 		String,
	email: 			String,
	groups: 		[String],
	photo:  		binData,
	page_size:
	language:
	sharing:
	status: 	String,
	start_date:	{type: Date, default: Date.now},
	task: 		{type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
});

Username
adriaene
Fullname
Adriana Ene
Password
Change Password
Email
Groups: 
Photo: binData


Page Size50Email TypeTextLanguageEnglishOwn ChangesNotify meSharing


module.exports = mongoose.model('Project', ProjectSchema);
