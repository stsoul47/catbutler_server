const requestErrorHandler = {
  /**
   * 에러 발생시 로그 핸들러
   *
   * @param {*} err
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  logHandler: function (err, req, res, next) {
    console.error('[ ' + new Date() + ' ]\n' + err.msg + '\n');
    console.trace(err);
    next(err);
  },
  /**
   * 에러 발생시 에러 메세지 전달 핸들러
   *
   * @param {*} err
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  errorHandler: function (err, req, res, next) {
    res.status(err.status || 500).json({ result: err } || 'Error');
  },
};

module.exports = requestErrorHandler;
