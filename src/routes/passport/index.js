const router = require('express').Router();
const index = {
	local: require('./localRoutes')
};

router.use('/local', index.local);

module.exports = router;