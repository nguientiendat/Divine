// const { model } = require('mongoose');
const authController = require('../controllers/authController.js');
const middlewareController = require('../controllers/middlewareController.js');

const router = require('express').Router();
router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)

//REFRESH
router.post("/refresh",authController.requestRefreshToken)

router.post("/logout",middlewareController.verifyTonken, authController.logOut)


module.exports = router;