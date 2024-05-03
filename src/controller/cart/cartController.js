const cartServices = require("../../services/cart/cartServices");
const {makeResponse} = require("../../utils/responseUtils");
const controllerCode = require("../../utils/statusCode/controllerCodes").controllerCode;
module.exports = {
  insertCart: async(req, res, next) => {
    try {
      const serviceResult = await cartServices.insertCart(req.body);
      if(serviceResult.code) {
        res.status(201).json(await makeResponse(controllerCode.SUCCESS, '장바구니 등록 성공'))
      } else throw new Error();
    } catch (error) {
      error.status = 500;
      error.msg = '장바구니 등록 실패';
      next(error);
    }
  },
  getCartList: async(req, res, next) => {
    try {
      const serviceResult = await cartServices.getCartList(req.query);
      if(serviceResult.code) {
        res.status(200).json(await makeResponse(controllerCode.SUCCESS,'장바구니 조회 성공', serviceResult.data))
      } else throw new Error();
    } catch (error) {
      error.status = 500;
      error.msg = '장바구니 조회 실패';
      next(error);
    }
  }
}