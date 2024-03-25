const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: false
	}
});
module.exports = mongoose.model('Test', testSchema);