const dbCodes = require('../../utils/statusCode/databaseCodes').database;
const reviewModel = require('../../models/review/reviewModels');

module.exports = {
  insertReview: async(reqData) => {
    try {
      const newReview = new reviewModel({
        item: reqData.itemId,
        user: reqData.userId,
        rating: reqData.rating,
        content: reqData.content,
        image: reqData.imageUrl
      });

      const result = await newReview.save();
      if(result) return {code: dbCodes.QUERY_SUCCESS};
    } catch (error) {
      return {code: dbCodes.QUERY_FAIL}
    }
  },
  getReviewList: async(reqData) => {
    try {
      reqData.rating = Number(reqData.rating);
  
      const pageNumber = (reqData.pageNumber - 1) * reqData.viewCount;
      const whereQuery = {item: reqData.itemId};
      if(reqData.rating > 0 && reqData.rating < 6) {
        whereQuery.rating = { $eq: reqData.rating };
      } else {

      }

      const count = await reviewModel.countDocuments(whereQuery);
      const result = await reviewModel
        .find(whereQuery, {__v: 0})
        .populate('user', {
          name: 1
        })
        .skip(pageNumber)
        .limit(reqData.viewCount)
        .sort({ createdAt: -1}); 

      if(result) return {code: dbCodes.QUERY_SUCCESS, totalCount: count, data: result};
    } catch(error) {
      return {code: dbCodes.QUERY_FAIL}
    }
  }
}