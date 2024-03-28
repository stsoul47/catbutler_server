const router = require('express').Router();

const index = {
  test: require('./TestRoutes'),
  user: require('./user/index'),
  auth: require('./passport/index')
};

router.use('/test', index.test);
router.use('/user', index.user);
router.use('/auth', index.auth);
module.exports = router;