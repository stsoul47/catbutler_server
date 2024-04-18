/**
 * 카트 서비스 모듈입니다.
 * @module cartServices
 */

const dbCodes = require('../../utils/statusCode/databaseCodes').database;
const cartModel = require('../../models/cart/cartModels');

module.exports = {
  /**
   * 카트에 상품을 추가하는 함수입니다.
   * @async
   * @param {Object} reqData - 요청 데이터
   * @param {string} reqData.userId - 사용자 ID
   * @param {Array} reqData.cartList - 카트에 추가할 상품 목록
   * @param {string} reqData.cartList[].item - 상품 ID
   * @param {number} reqData.cartList[].quantity - 상품 수량
   * @param {string} reqData.cartList[].selectOption - 선택한 옵션
   * @returns {Object} - 데이터베이스 응답 코드
   * @returns {number} code - 응답 코드
   */
  insertCart: async (reqData) => {
    try {
      const newCart = new cartModel({
        user: reqData.userId,
        carts: reqData.cartList.map((item) => ({
          item: item.item,
          quantity: item.quantity,
          selectOption: item.selectOption,
        })),
      });
      const result = await newCart.save();

      if (result) return { code: dbCodes.QUERY_SUCCESS };
    } catch (error) {
      return { code: dbCodes.QUERY_FAIL };
    }
  },

  /**
   * 카트 목록을 가져오는 함수입니다.
   * @async
   * @param {Object} reqData - 요청 데이터
   * @param {string} reqData.userId - 사용자 ID
   * @returns {Object} - 데이터베이스 응답 코드와 카트 목록 데이터
   * @returns {number} code - 응답 코드
   * @returns {Array} data - 카트 목록 데이터
   */
  getCartList: async (reqData) => {
    try {
      const result = await cartModel
        .find({ user: reqData.userId }, { __v: 0, _id: 0 })
        .populate('carts.item', {
          _id: 0,
          productName: 1,
          deliveryFee: 1,
          price: 1,
          mainImage: 1,
        });

      if (result.length > 0) {
        const formatData = cartListFormatting(result);
        return { code: dbCodes.QUERY_SUCCESS, data: formatData[0].carts };
      }
      else return {code: dbCodes.QUERY_SUCCESS, data: []};
    } catch (error) {
      return { code: dbCodes.QUERY_FAIL };
    }
  },
};

/**
 * 카트 목록을 포맷팅하는 함수입니다.
 * @param {Array} cartList - 카트 목록 데이터
 * @returns {Array} - 포맷팅된 카트 목록 데이터
 */
const cartListFormatting = (cartList) => {
  const formattedResult = cartList.map((item) => {
    return {
      user: item.user,
      carts: item.carts.map((cart) => ({
        item: cart.item,
        quantity: cart.quantity,
        selectOption: cart.selectOption,
      })),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
  return formattedResult;
};