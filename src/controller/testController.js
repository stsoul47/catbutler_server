const {makeResponse} = require('../utils/responseUtils');
const controllerCodes = require('../utils/statusCode/controllerCodes').controllerCode;
module.exports = {
  getTest: async (req, res, next) => {
    try {
      res.status(200).send(await makeResponse(controllerCodes.SUCCESS, '조회 테스트 성공'))
    } catch ( error ) {
      error.status = 500;
      error.msg = '조회 테스트 실패';
      next(error);
    }
  }
}