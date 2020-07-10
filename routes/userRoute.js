const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {errorHandle, wrongRoute} = require('../helpers/errorHandle')

router.post('/signup', userController.signUp, errorHandle)
router.post('/signin', userController.signIn, errorHandle)
router.use(wrongRoute)

module.exports = router;
