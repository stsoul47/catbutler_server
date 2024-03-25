const router = require('express').Router();

const index = {
  test: require('./TestRoutes')
};

router.use('/test', index.test);

module.exports = router;