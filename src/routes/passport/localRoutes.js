const router = require('express').Router();
const passport = require('passport');

const jwt = require('../../utils/jwt');
const UUID = require('../../utils/uuid');
const { setRedisData } = require('../../utils/redis.utils');
const { REFRESH_TOKEN_EXPIRE } = require('../../utils/jwtConfig');
const { makeResponse } = require('../../utils/responseUtils');
const { controllerCode } = require('../../utils/statusCode/controllerCodes');


/**
 * @swagger
 * /auth/local:
 *  post:
 *    tags: 
 *      - auth
 *    summary: 로그인(local)
 *    description: 로그인 local - 소셜 로그인이 아님
 *    requestBody:
 *      x-name: body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/login'
 *          examples:
 *            LoginExample:
 *              $ref: '#/components/examples/LoginExample'
 *    responses:
 *      201: 
 *        description: Created
 *        headers: 
 *          AccessToken:
 *            schema: 
 *              type: string
 *            description: Bearer Token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *            examples:
 *              LoginSuccessExample: 
 *                $ref: '#/components/examples/LoginSuccessExample'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      500:
 *        $ref: '#/components/responses/InternalServer'
 */
router.post('/', (req, res, next)=> {
	passport.authenticate('local', async(authError, user, info) => {
		// (authError, user, info) => 이 콜백 미들웨어는 localStrategy에서 done()이 호출될 때 실행된다.
		// localStrategy에서 done()함수에 로직 처리에 따라 1,2,3번째 인자에 넣는 순서가 달랐는데 그 이유가 바로 여기서 사용되기 때문이다.

		if(authError) {
			console.error(authError);
			return next(authError);
		}
		if(!user) {
			return res.status(401).send({code: 401, message:"권한이 없습니다."});
		}
		const accessToken = await getAccessToken(user.id);
		res.header('AccessToken', 'Bearer ' + accessToken);

		const data = {
			...user._doc,
			accessToken: accessToken
		}
		delete data.password;
		delete data.salt;

		return res.status(201).json(await makeResponse(controllerCode.SUCCESS, '로그인 성공', data));
	})(req, res, next);
});

const getAccessToken = async ( uuid ) => {
	const jwtId = await UUID.makeUUID();
	const accessToken = await jwt.sign(uuid, jwtId);
	const refreshToken = await jwt.refresh(jwtId);
	await setRedisData(uuid, refreshToken, REFRESH_TOKEN_EXPIRE);

	return accessToken;
}

module.exports = router;
