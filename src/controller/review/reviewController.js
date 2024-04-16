const { makeResponse } = require("../../utils/responseUtils")
const controllerCode = require("../../utils/statusCode/controllerCodes").controllerCode;
const reviewServices = require('../../services/review/reviewServices');

module.exports = {
  uploadImageTemp: async(req, res, next) => {
    try {
      const {files} = req;
      const data = {
        filename: [],
        path: []
      }
      for(let index in files) {
        data.filename.push(files[index].filename);
        data.path.push(files[index].path);
      }
      res.status(201).json(await makeResponse(controllerCode.SUCCESS, '리뷰 이미지 임시 등록 성공', data));
    } catch(error) {
      error.status = 500;
      error.msg = '리뷰 이미지 임시 등록 실패';
      next(error);
    }
  },
  insertReview: async(req, res, next) => {
    try {
      const serviceResult = await reviewServices.insertReview(req.body);
      if(serviceResult.code) {
        res.status(201).json(await makeResponse(controllerCode.SUCCESS, '리뷰 등록 성공'))
      } else throw new Error();
    } catch (error) {
      error.status = 500;
      error.msg = '리뷰 등록 실패';
      next(error);
    }
  },
  getReviewList: async(req, res, next) => {
    try {
      const serviceResult = await reviewServices.getReviewList(req.query);
      if(serviceResult.code) {
        const data = {
          count: Number(serviceResult.totalCount),
          list: serviceResult.data,
          page: Number(req.query.pageNumber),
        }
        res.status(200).json(await makeResponse(controllerCode.SUCCESS, '리뷰 리스트 조회 성공', data))
      } else throw new Error();
    } catch (error) {
      error.status = 500;
      error.msg = '리뷰 리스트 조회 실패';
      next(error);
    }
  }
}