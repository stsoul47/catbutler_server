const crypto = require('crypto');

module.exports = {
  createRandomNumber: async (max = 999999, min = 111111) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  createRandomToken: async (length = 20) => {
    return crypto.randomBytes(length).toString('hex');
  },
  createRandomCode: async (length = 8) => {
    return Math.random().toString(16).substring(2, (length + 2));
  }
}