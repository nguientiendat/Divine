const userController = require('../controllers/userController')
const middlewareController = require('../controllers/middlewareController')
const router = require('express').Router();
//GET ALL USERS
router.get('/',middlewareController.verifyTonken,userController.getAllUsers)
//DELETE ALL USERS
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,userController.deleteUsers)


module.exports = router;
