const express = require('express')
const userController = require('../controllers/usercontroller')

// To Setup routes outside express server, create object for router class of express 
const router = new express.Router()

// Register
router.post('/register',userController.registerController)
// Login
router.post('/login',userController.loginController)

module.exports = router