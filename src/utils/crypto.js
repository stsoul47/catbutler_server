const crypto = require('crypto');
const util = require('util');

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  /**
   * salt값 생성
   *
   * @returns String
   */
  makeSalt: async function () {
    const salt = await randomBytesPromise(64);

    return salt.toString('base64');
  },

  /**
   * password Hashing
   *
   * @param {String} password
   * @returns String, String
   */
  makePasswordHash: async function (password) {
    try {
      const salt = await this.makeSalt();
      const key = await pbkdf2Promise(
        password,
        salt,
        Number(process.env.HASH_STRETCH),
        64,
        'sha512'
      );
      const hashedKey = key.toString('base64');

      return { hashedKey, salt };
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 패스워드 검증
   *
   * @author Mins
   *
   * @param {String} password
   * @param {String} salt
   *
   * @returns {String} hashedKey
   */
  verifyPassword: async function (password, salt) {
    const key = await pbkdf2Promise(
      password,
      salt,
      Number(process.env.HASH_STRETCH),
      64,
      'sha512'
    );
    const hashedKey = key.toString('base64');

    return hashedKey;
  },
};
