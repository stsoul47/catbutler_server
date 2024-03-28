/**
 * 인증 미들웨어
 * @module authMiddlewares
 */

const jwt = require('../utils/jwt');
const { CHECK_SUCCESS, CHECK_EXPIRED, REFRESH_ACCESS_TOKEN_ERROR, REFRESH_SUCCESS, REFRESH_EXPIRED } = require('../utils/jwtConfig');

/**
 * 사용자가 인증되었는지 확인하는 미들웨어 함수
 * @function authenticated
 * @param {Object} req - 요청 객체
 * @param {Object} res - 응답 객체
 * @param {Function} next - 다음 미들웨어 함수
 * @returns {void}
 * @throws {Error} - 인증 실패 시 401 Unauthorized 에러 발생
 */
module.exports = {
  authenticated: (req, res, next) => {
    try {
      const token = req.headers.authorization.split('Bearer ')[1];
      const checkJwt = authVerify(token);

      if(checkJwt.status === CHECK_SUCCESS) {
        next();
      } else if(checkJwt.status === CHECK_EXPIRED) {
        // 토큰이 만료되었을 때
        const newToken = resissuance(token);
        if(newToken.status === REFRESH_SUCCESS) {
          console.log("new access token:", newToken.accessToken);
          res.headers('AccessToken', 'Bearer ' + newToken.accessToken);
          next();
        } else if(newToken.status === REFRESH_EXPIRED) {
          const error = new Error();
          error.status(401);
          error.msg = 'Unauthorized';
          next(error);
        } else if(newToken.status === REFRESH_ACCESS_TOKEN_ERROR) {
          const error = new Error();
          error.status(401);
          error.msg = 'Unauthorized';
          next(error);
        }
      } else {
        const error = new Error();
        error.status(401);
        error.msg = 'Unauthorized';
        next(error);
      }
    } catch (error) {
      error.status = 401;
      error.msg = 'Unauthorized';
      next(error);
    }
  }
}

/**
 * JWT 토큰을 검증하는 함수
 * @function authVerify
 * @param {string} token - JWT 토큰
 * @returns {Object} - JWT 검증 결과
 */
const authVerify = (token) => {
  try {
    const checkJwt = jwt.verify(token);
    return checkJwt;
  } catch (error) {
    console.trace(error)
  }
}

/**
 * 토큰 재발급 함수
 * @function reissuance
 * @param {string} token - JWT 토큰
 * @returns {Object} - 토큰 재발급 결과
 */
const reissuance = async (token) => {
	const accessPayload = decodeData(token);
	try {
		const refresh = await RedisUtil.getRedisData(accessPayload.uuid);
		const refreshPayload = decodeData(refresh);

		if (!refresh || refresh === undefined) { // refresh 만료
			return { status: REFRESH_EXPIRED, accessToken: null }
		} else if( accessPayload.jwtId === refreshPayload.jwtId) { // 정상 상태, access_token, refresh token 재발급
			const accessToken = await getAccessToken(accessPayload.uuid);
			return { status: REFRESH_SUCCESS , accessToken: accessToken };
		}
		else { // access_token, refresh_token mismatch
			return { status: REFRESH_ACCESS_TOKEN_ERROR, accessToken: null }
		}
	} catch (error) {
		console.error(error);
	}
}