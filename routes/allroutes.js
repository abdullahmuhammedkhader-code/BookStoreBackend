const express = require('express')
const userController = require('../controllers/usercontroller')
const authMiddleware = require('../middlewares/authmiddlewares')
const multerMiddleware = require('../middlewares/multerMiddleware')


// To Setup routes outside express server, create object for router class of express 
const router = new express.Router()

// Register
router.post('/register',userController.registerController)
// Login
router.post('/login',userController.loginController)

// router.post('/google-login',userController.googleLoginController)

router.put('/user/:id',authMiddleware,multerMiddleware.single('picture'),userController.userEditController)

module.exports = router