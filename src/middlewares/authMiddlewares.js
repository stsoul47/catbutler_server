module.exports = {
  tokenCheck: async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
  }
}