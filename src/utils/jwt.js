const jwt = require('jsonwebtoken');
const jwtCodes = require('../utils/statusCode/jwtCodes').jwt;
const jwtConfig = require('../utils/jwtConfig');
const uuid = require('../utils/uuid');
const redis = require('../utils/redis');

const jwtOptions = {
  algorithm: process.env.ALGORITHM,
};
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  /**
   * make JWT
   *
   * @param {Object} payload
   * @param {String} issuer
   * @returns
   */

  sign: async (payload, issuer) => {
    payload.iss = issuer;
    const result = new Object();

    try {
      result.refreshToken = jwt.sign(payload, secretKey, {
        ...jwtOptions,
        expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRE,
      });
      result.accessToken = jwt.sign(payload, secretKey, {
        ...jwtOptions,
        expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRE,
      });
    } catch (error) {
      result.err = error;
    }
    return result;
  },

  verify: async (token, jwtid) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey, { jwtid: jwtid });
    } catch (err) {
      if (err.message === 'jwt expired') {
        return jwtCodes.TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        return jwtCodes.TOKEN_INVALID;
      } else {
        return jwtCodes.TOKEN_INVALID;
      }
    }
    return decoded;
  },

  /**
   * JWT TOKEN 생성 함수
   * @param {String} user_uuid 
   * @returns 
   */
    makeJWT: async function (user_uuid) {
      const payload = {
        uid: user_uuid,
        jti: await uuid.makeUUID(),
      };

      const token = await this.sign(payload, 'user');

      await redis.set(user_uuid, token.refreshToken);
      await redis.expire(user_uuid, jwtConfig.REFRESH_TOKEN_EXPIRE);
  
      return token.accessToken;
    }
};
