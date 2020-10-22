var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String
})

UserSchema.plugin(passportLocalMongoose, {
	usernameField: 'username'
})

module.exports = mongoose.model('User', UserSchema)

// Somewhere in this file you can change or add to allow for the user to login with their email address
