var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
	fname: { type: String, unique: false, required: true },
	lname: { type: String, unique: false, required: true }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

