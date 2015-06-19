
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	oauthId: Number,
	physicalAddress: {
		street: String,
		city: String,
		state: String,
		zip: String,
		zip4: String
	}
});