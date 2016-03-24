var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
	name: { type: String, unique: true, required: true },
	date: { type: String, required: false },
	description: { type: String, unique: false, required: false },
	address: { type: String, unique: false, required: false }
});

module.exports = mongoose.model('Event',Event);
