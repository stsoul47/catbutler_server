const { v4 } = require('uuid');

/**
 * 인덱싱 및 DB검색을 위해 UUID구조 수정
 *
 * @returns Promise(String UUID)
 */
module.exports.makeUUID = async function () {
  const tokens = v4().split('-');
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};
