const dbCodes = require('../../utils/statusCode/databaseCodes').database;
const itemModel = require('../../models/item/itemModels');

module.exports = {
  getItemList: async (reqData) => {
    try {
      const pageNumber = (reqData.pageNumber - 1) * reqData.viewCount;

      const count = await itemModel.countDocuments({isVisible: 1});
      const result = await itemModel.find({isVisible: 1}).skip(pageNumber).limit(reqData.viewCount).sort({ createdAt: -1}); 
      
      if(result) return {code: dbCodes.QUERY_SUCCESS, totalCount: count, data: result};
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