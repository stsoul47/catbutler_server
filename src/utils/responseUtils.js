/**
 * Response Maker
 * @module utils/responseUtils
 */
module.exports = {
  /**
   *
   * @function
   * @param {Number} status - 성공:0, 실패:1
   * @param {String} message - response message
   * @param {Any} data - response data, default value = {}
   * @returns
   */
  makeResponse: async function(status, message, data = {}) {
    return {
      result: {
        code: status,
        message: message,
        data: data
      }
    }
  }
}