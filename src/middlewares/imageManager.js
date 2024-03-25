const fs = require('fs').promises;
const path = require('path');
/**
 * for 문을 활용한 imagefile temp to image
 * 
 * @param {Request} req 
 * @param {Array} filename 
 * @param {String} tempPath 
 * @param {String} imagePath 
 * @param {Array} fileUrl
 * @param {String} saveFilePath
 * @returns {Object} {result:boolean,err?:error}
 * 
 * @author mins
 */
const moveNextImageFor = async (req, filename, tempPath, imagePath, fileUrl = [], saveFilePath) => {
  try {
    for (let index in filename) {
      await fs.rename(tempPath + filename[index], imagePath + filename[index]);
      fileUrl.push(saveFilePath + filename[index]);
    }
    req.data = { message: 'file mv successfully' };
    return { result: true, fileUrl:fileUrl };
  } catch (error) {
    console.trace(error);
    const err = new Error('File COPY ERROR : ', error?.Code);

    err.status = 400;
    err.send = { message: 'File COPY ERROR', code: error?.Code };
    return { result: false, err: err };
  }
};


/**
 * filename validation
 * 
 * @param {Array} filename - image filename array 
 * @returns
 * 
 * @author mins 
 */
const isValidate = async (filename) =>{
  if (!filename) {
    return {result:1};
  }
  // filename이 없거나 배열이 아닐 경우 400 에러 발생
  if (!Array.isArray(filename)) {
    const err = new Error('파일 이름이 지정되지 않았습니다.');
    err.status = 400;
    err.send = { message: 'FileName Not Found ERROR or NOT Array' };
    return {result:0,err:err};
  }
  return 2;
}

module.exports = {
  /**
   * 항상 body 값은 filename, 배열 형식!!!
   * 
   * @param {String} tempPathParam - /cdn/path/temp/
   * @param {String} imagePathParam - /cdn/path/image/
   * @param {String} fieldName - request에서 이미지를 보낸 명칭 example - 'delete_image'
   * @param {String} fileArray - 다시 req.body에 반환될 배열명칭  - 'fileUrl'
   * @returns 
   */
  moveImage: function (fromPathParam, toPathParam, fieldName, fileArray) {
    return async(req, res, next) => {
      const filename = req.body[fieldName];
      const validateResult = isValidate(filename);

      if(validateResult.result == 1) return next();
      else if(validateResult.result == 0) return next(validateResult.err);

      const tempPath = path.join(__dirname, '..', '..', fromPathParam);
      const imagePath = path.join(__dirname, '..', '..', toPathParam);

      const moveResult = await moveNextImageFor(req, filename, tempPath, imagePath, [], toPathParam);

      if (moveResult.result){
        req.body[fileArray] = moveResult.fileUrl;
        return next();
      } 
      else {
        return next(moveResult.err);
      }
    }
  },
  /**
   * temp => origin, delete, new 3개 
   * originFileUrl image => temp (원래 있는 파일들 url이 다 있잖아?);
   * 
   * delete로 이동을 수행하고, 그이름을 originFileUrl에서 pop을 해
   * new image폴더로 옮기고 originFileUrl로 push
   * @param {*} folder 
   * @returns 
   */
  updateMoveImage: function(folder) {
    return async(req, res, next) => {
      const {origin_file, new_file, delete_file} = req.body;

      
      const newImageValidateResult = isValidate(new_file);
      
      if(newImageValidateResult.result == 1) return next();
      else if(newImageValidateResult.result == 0) return next(newImageValidateResult.err);
      
      const imageMerge = [
        ...origin_file,
        ...new_file
      ]
      const updateImage = imageMerge.filter(el => !delete_file.includes(el));

      const tempPath = path.join(__dirname, '..', '..', '/cdn/' + folder +'/temp/');
      const imagePath = path.join(__dirname, '..', '..', '/cdn/' + folder +'/image/');

      const moveResult = await moveNextImageFor(req, updateImage, tempPath, imagePath, [], '/cdn/' + folder +'/image/');

      if (moveResult.result){
        req.body.updateImageUrl = moveResult.fileUrl;
        return next();
      } 
      else return next(moveResult.err);
    }
  }
}