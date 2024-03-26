const { makeResponse } = require("../../utils/responseUtils");
const controllerCodes = require("../../utils/statusCode/controllerCodes").controllerCode;
const userServices = require("../../services/user/userServices");
const resultStatusCode = require("../../utils/statusCode/resultStatusCodes").resultStatusCode;
module.exports = {
	registerUser: async (req, res, next) => {
		try {
			const serviceResult = await userServices.registerUser(req.body);
			if(serviceResult.code) {
				res.status(201).json(await makeResponse(controllerCodes.SUCCESS, '회원가입 성공'))
			} else throw new Error();
		} catch ( error ) {
			error.status = 500;
			error.msg = '회원가입 실패';
			next(error);
		}
	},
	emailCheck: async (req, res, next) => {
		try {
			const serviceResult = await userServices.emailCheck(req.query);

			if(serviceResult.code && serviceResult.status === resultStatusCode.SUCCESS) {
				res
					.status(200)
					.json(await makeResponse(
						controllerCodes.SUCCESS, 
						'이메일 중복검사 성공'
					))
			} 
			else if(serviceResult.code && serviceResult.status === resultStatusCode.DUPLICATION) {
				res
					.status(409)
					.json(await makeResponse(
						controllerCodes.DUPLICATION, 
						'중복된 이메일'
					))
			}
			else throw new Error();
		} catch ( error ) {
			error.status = 500;
			error.msg = '이메일 중복검사 실패';
			next(error);
		}
	}
}