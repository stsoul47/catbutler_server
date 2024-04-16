const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[1];

  if (
    fileType == 'jpg' ||
    fileType == 'png' ||
    fileType == 'jpeg' ||
    fileType == 'gif' || 
    fileType == 'mp4'
  ) {
    req.fileValidationError = null;
    cb(null, true);
  } else {
    req.fileValidationError = 'Allow Upload Only [ jpg,jpeg,png,gif,mp4 ] FileType';
    return cb(null, false);
  }
  //mp4
};

function upload(tempPath) {
  return multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, tempPath);
      },
      filename(req, file, done) {
        const uuid = uuidv4();
        const ext = path.extname(file.originalname);
        const fileName = uuid.replace(/-/g, '') + ext;
        done(null, fileName);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: fileFilter,
  });
}

const checkPath = (tempPath) => {

  const tempPathSlice = tempPath.split("/");
  const subPath = tempPathSlice[0] + "/" + tempPathSlice[1];
  const imagePath = subPath+"/image";
  const deletePath = subPath+"/delete";
  try {
    fs.readdirSync(tempPath);
  } catch (error) {
    if (!fs.existsSync(subPath)) {
      fs.mkdirSync(subPath);
    }
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath);
    }
    if (!fs.existsSync(deletePath)) {
      fs.mkdirSync(deletePath);
    }
  }
}
module.exports = {
  /**
   * 
   * @param {String} tempPath - path 앞뒤로 / 제거 'cdn/path/path'
   * @param {String} imageParam - 파라미터 키값
   * @returns 
   */
  singleTemp: function(tempPath, imageParam) {
    checkPath(tempPath);
    return upload(tempPath).single(imageParam);
  },
  /**
   * 
   * @param {String} tempPath - path 앞뒤로 / 제거 'cdn/path/path'
   * @param {String} imageParam - 파라미터 키값
   * @returns 
   */
  ArrayTemp: function(tempPath, imageParam, maxCount = 10) {
    try {
      checkPath(tempPath);
      return upload(tempPath).array(imageParam, maxCount);
    } catch (error) {
      console.trace(error);
      return error;
    } 
  }
};
