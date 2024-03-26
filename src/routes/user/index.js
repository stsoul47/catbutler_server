const router = require('express').Router();
const userController = require('../../controller/user/userController');

router.post('/register', userController.registerUser);
router.get('/check', userController.emailCheck);
module.exports = router;