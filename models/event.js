var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = mongoose.model('User');

var Event = new Schema({
	name: { type: String, unique: true, required: true },
	date: { type: String, required: false },
	description: { type: String, unique: false, required: false },
	address: { type: String, unique: false, required: false },
	createdBy: { type: Schema.ObjectId, ref: 'User', unique: false, required: true }
},{timestamps:true});

module.exports = mongoose.model('Event',Event);
