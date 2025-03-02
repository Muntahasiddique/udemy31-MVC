const express = require('express');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.get('/signup', authController.signup);
router.post('/signup', authController.signuppost);

router.get('/login', authController.login);
router.post('/login', authController.loginpost);

router.post('/logout', authController.logout);
router.get('/404',authController.get404)
module.exports = router;
