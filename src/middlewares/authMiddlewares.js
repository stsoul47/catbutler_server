const jwt = require('../utils/jwt');
const jwtCodes = require('../utils/statusCode/jwtCodes').jwt;
const redis = require('../utils/redis');

async function verifyToken(bearerToken) {
  try {
    const accessToken = bearerToken.split(' ')[1];
    console.log('accesstoken',accessToken);
    const accessJwtResult = await jwt.verify(accessToken);
    console.log('verfiyresult', accessJwtResult);
    if (accessJwtResult === jwtCodes.TOKEN_INVALID) {
      return { result: 'FAIL',reason:'Token invaild' };
    }

    let payload = accessJwtResult;
    let refreshTokenExist, refreshToken, refreshJwtResult, newToken;

    if (accessJwtResult === jwtCodes.TOKEN_EXPIRED) {
      payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
    }

    refreshTokenExist = await redis.exists(payload.uid);

    if (refreshTokenExist) {
      refreshToken = await redis.get(payload.uid);
      refreshJwtResult = await jwt.verify(refreshToken, payload.jti);
    }else{
      return { result: 'FAIL', reason: 'refresh token expired' };
    }

    if (accessJwtResult === jwtCodes.TOKEN_EXPIRED && refreshJwtResult.uid) {
      newToken = await jwt.sign(
        { uid: payload.uid, jti: refreshJwtResult.jti},
        'user'
      );
    }

    if (newToken) {
      return {
        accessToken: newToken.accessToken || accessToken,
        result: 'OK',
        user_uuid: payload.uid,
        reason: 'accesstoken expired',
      };
    } else if (refreshJwtResult === jwtCodes.TOKEN_INVALID || refreshJwtResult === jwtCodes.TOKEN_EXPIRED) {
      return { result: 'FAIL', reason: 'refresh token invalid' };
    } else {
      return {
        accessToken: accessToken,
        result: 'OK',
        user_uuid: payload.uid,
        reason: 'all token not expired'
      };
    }
  } catch (error) {
    console.trace(error);
    return { result: 'FAIL' };
  }
}


module.exports = {
  authMiddleware: async function (req, res, next) {
    try {
      const { accessToken, result, user_uuid, reason } = await verifyToken(req.headers.authorization);

      // console.log(accessToken);
      // console.log(locationCode);
      console.log('result', result);
      if (result === 'OK') {
        res.header('AccessToken', 'Bearer ' + accessToken);
        req.accessToken = accessToken;
        req.body.user_uuid = user_uuid;
        req.result = result;
        req.reason = reason;
        return next();
      } else {
        throw new Error("로그인이 해제되었습니다.");
      }
    } catch (error) {
      console.trace(error);
      error.status = 401;
      error.code = 1;
      error.msg = "로그인이 해제되었습니다.";
      next(error);
    }
  },
};
