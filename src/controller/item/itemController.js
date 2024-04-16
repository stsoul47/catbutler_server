const {makeResponse} = require('../../utils/responseUtils');
const controllerCode = require('../../utils/statusCode/controllerCodes').controllerCode;
const itemServices = require('../../services/item/itemServices');
module.exports = {
  getItemList: async(req, res, next) => {
    try {
      const serviceResult = await itemServices.getItemList(req.query);

      if(serviceResult.code) {
        const data = {
          count: Number(serviceResult.totalCount),
          list: serviceResult.data,
          page: Number(req.query.pageNumber),
        }
        res.status(200).json(await makeResponse(controllerCode.SUCCESS, '상품 리스트 조회 성공', data))
      } else throw new Error();
    } catch (error) {
      error.status = 500;
      error.msg = '상품 리스트 조회 실패';
      next(error);
    }
  },
  getItemDetail: async(req, res, next) => {
    try {
      const serviceResult = await itemServices.getItemDetail(req.params.id);
      if(serviceResult.code) {
        res.status(200).json(await makeResponse(controllerCode.SUCCESS, '상품 상세 조회 성공', serviceResult.data))
      }
    } catch (error) {
      error.status = 500;
      error.msg = '상품 상세 조회 실패';
      next(error);
    }
  },
  uploadMainImageTemp: async(req, res, next) => {
    try {
      const data = {
        filename: [req.file.filename],
        path: [req.file.path]
      }
      res.status(201).json(await makeResponse(controllerCode.SUCCESS, '메인 이미지 임시 등록 성공', data))
    } catch (error) {
      error.status = 500;
      error.msg = '메인 이미지 임시 등록 실패';
      next(error);
    }
  },
  uploadDetailImageTemp: async(req, res, next) => {
    try {
      const { files } = req;

      const data = {
        filename: [],
        path: []
      }
      
      for(let index in files){
        data.filename.push(files[index].filename);
        data.path.push(files[index].path);
      }

      res.status(201).json(await makeResponse(controllerCode.SUCCESS, '상세 이미지 임시 등록 성공', data))
    } catch (error) {
      error.status = 500;
      error.msg = '상세 이미지 임시 등록 실패';
      next(error);
    }
  },
  insertItem: async(req, res, next) => {
    try {
      const serviceResult = await itemServices.insertItem(req.body);
      if(serviceResult.code) {
        res.status(201).json(await makeResponse(controllerCode.SUCCESS, '상품 등록 성공'))
      } else throw new Error();
    } catch (error) {
      error.status = 500;
      error.msg = '상품 등록 실패';
      next(error);
    }
  }
}