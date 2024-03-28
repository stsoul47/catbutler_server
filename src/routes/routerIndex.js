const router = require('express').Router();

const index = {
  test: require('./TestRoutes'),
  user: require('./user/index'),
  auth: require('./passport/index'),
  item: require('./item/index')
};

router.use('/test', index.test);
router.use('/user', index.user);
router.use('/auth', index.auth);
router.use('/item', index.item);
module.exports = router;