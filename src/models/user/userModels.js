const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: false
	},
	salt: {
		type: String,
		required: true
	},
	consent: {
		termsAgree: {
			type: Boolean,
			required: true,
			default: false
		},
		electronicAgree: {
			type: Boolean,
			required: true,
			default: false
		},
		personalInfoAgree: {
			type: Boolean,
			required: true,
			default: false
		},
		marketingAgree: {
			type: Boolean,
			default: false
		},
		advertisementAgree: {
			emailAgree: {
				type: Boolean,
				default: false
			},
			snsAgree: {
				type: Boolean,
				default: false
			},
		}
	}
});

module.exports = mongoose.model('User', userSchema);