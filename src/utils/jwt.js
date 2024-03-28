const jwtUtil = require('jsonwebtoken');
const { ACCESS_TOKEN_EXPIRE, CHECK_SUCCESS, CHECK_EXPIRED, CHECK_FAILED, REFRESH_TOKEN_EXPIRE } = require('./jwtConfig');

const SECRET = process.env.JWT_SECRET_KEY || config.jwtSecret;
const ALGORITHM = process.env.JWT_ALGORITHM || config.jwtAlgorithm;

module.exports = {
	sign: ( uuid, jwtId ) => { // access token 발급
		const payload = { uuid, jwtId }; // payload 생성
		return jwtUtil.sign(payload, SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRE,
			algorithm: ALGORITHM,
		});
	},
	verify: ( token ) => { //access token 검증
		try {
			const decoded = jwtUtil.verify(token, SECRET);
			return { status: CHECK_SUCCESS, uuid: decoded.uuid }
		}catch(error) {
			// console.log("[jwt Util] error message", error.message );
			if(error.message === "jwt expired") {
				return { status: CHECK_EXPIRED, message: error.message }
			}
			else return { status: CHECK_FAILED, message: error.message }
		}
	},
	refresh: ( jwtId ) => { //refresh token 발급
		return jwtUtil.sign({ jwtId }, SECRET, { // refresh token은 payload 필요 없음
			algorithm: ALGORITHM,
			expiresIn: REFRESH_TOKEN_EXPIRE
		});
	},
	decoding: (encodeData) => {
		const payload = Buffer.from(encodeData, 'base64');
		return JSON.parse(payload.toString());
		// return jwtUtil.decode(encodeData);
	}
}