const dbCodes = require('../../utils/statusCode/databaseCodes').database;
const itemModel = require('../../models/item/itemModels');

module.exports = {
  getItemList: async (reqData) => {
    try {
      const pageNumber = (reqData.pageNumber - 1) * reqData.viewCount;

      

      let findQuery = {};
      findQuery.isVisible = 1;
      if(reqData.category === '0000') {
      } else if(reqData.category !== '0000' && reqData.category.endsWith('00')) {
        findQuery.category = {$regex: '^' + reqData.category.slice(0, 2)};
      } else {
        findQuery.category = reqData.category;
      }

      const count = await itemModel.countDocuments(findQuery);

      const result = await itemModel
        .find(findQuery, {
          deliveryFee: 0,
          option: 0,
          requiredInfo: 0,
          detailImage: 0,
          deleteTime: 0,
          updatedAt: 0,
          __v: 0
        })
        .skip(pageNumber)
        .limit(reqData.viewCount)
        .sort({ createdAt: -1}); 
      
      if(result) return {code: dbCodes.QUERY_SUCCESS, totalCount: count, data: result};
    } catch (error) {
      return {code: dbCodes.QUERY_FAIL}
    }
  },
  getItemDetail: async (itemId) => {
    try {
      const result = await itemModel.findOne({_id: itemId, isVisible: 1}, {__v: 0, deleteTime: 0 });
      if(result) return {code: dbCodes.QUERY_SUCCESS, data: result};
      else return {code: dbCodes.QUERY_SUCCESS, data: {}};
    } catch (error) {
      return {code: dbCodes.QUERY_FAIL}
    }
  },
  insertItem: async (reqData) => {
    try {
      const newItem = new itemModel({
        category: reqData.category,
        productName: reqData.productName,
        price: reqData.price,
        deliveryFee: reqData.deliveryFee ? reqData.deliveryFee : 0,
        option: reqData.option,
        mainImage: reqData.mainFileUrl,
        requiredInfo: {
          modelName: reqData.requiredInfo.modelName ? reqData.requiredInfo.modelName : null,
          power: reqData.requiredInfo.power ? reqData.requiredInfo.power : null,
          manufacturer: reqData.requiredInfo.manufacturer ? reqData.requiredInfo.manufacturer : null,
          size: reqData.requiredInfo.size ? reqData.requiredInfo.size : null,
          specification: reqData.requiredInfo.specification ? reqData.requiredInfo.specification : null,
          asInfo: reqData.requiredInfo.asInfo ? reqData.requiredInfo.asInfo : null,
          kcInfo: reqData.requiredInfo.kcInfo ? reqData.requiredInfo.kcInfo : null,
          releaseDate: reqData.requiredInfo.releaseDate ? reqData.requiredInfo.releaseDate : null,
          country: reqData.requiredInfo.country ? reqData.requiredInfo.country : null,
          weight: reqData.requiredInfo.weight ? reqData.requiredInfo.weight : null,
          quality: reqData.requiredInfo.quality ? reqData.requiredInfo.quality : null
        },
        detailImage: reqData.detailFileUrl
      });

      const result = await newItem.save();
      if(result) return {code: dbCodes.QUERY_SUCCESS};
    } catch (error) {
      return {code: dbCodes.QUERY_FAIL}
    }
  }
}