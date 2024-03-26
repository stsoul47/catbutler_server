const router = require('express').Router();

const index = {
  test: require('./TestRoutes'),
  user: require('./user/index')
};

router.use('/test', index.test);
router.use('/user', index.user);

module.exports = router;