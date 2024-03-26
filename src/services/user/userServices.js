const userModel = require('../../models/user/userModels');
const dbCodes = require('../../utils/statusCode/databaseCodes').database;
const resultStatusCode = require('../../utils/statusCode/resultStatusCodes').resultStatusCode;
const crypto = require('../../utils/crypto');
module.exports = {
	registerUser: async (data) => {
		try {
			const {hashedKey, salt} = await crypto.makePasswordHash(data.password);
			const newRegister = new userModel({
				email: data.email,
				password: hashedKey,
				name: data.name,
				phoneNumber: data.phoneNumber,
				salt: salt,
				consent: {
					termsAgree: data.termsAgree,
					electronicAgree: data.electronicAgree,
					personalInfoAgree: data.personalInfoAgree,
					marketingAgree: data.marketingAgree,
					advertisementAgree: {
						emailAgree: data.emailAgree,
						snsAgree: data.snsAgree
					}
				}
			})
			const result = await newRegister.save();
			if(result) return {code: dbCodes.QUERY_SUCCESS};
		} catch (error) {
			return {code: dbCodes.QUERY_FAIL}
		}
	},
	emailCheck: async (data) => {
		try {
			const result = await userModel.findOne({email: data.email});
			if(result) 
				return {code: dbCodes.QUERY_SUCCESS, status: resultStatusCode.DUPLICATION};
			else 
				return {code: dbCodes.QUERY_SUCCESS, status: resultStatusCode.SUCCESS};
		} catch (error) {
			return {code: dbCodes.QUERY_FAIL};
		}
	}
}