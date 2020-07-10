const express = require('express')
const authen = require('../helpers/middleware')
const router = express.Router()
const userController = require('../controllers/bookController')
const {errorHandle, wrongRoute} = require('../helpers/errorHandle')

router.use(authen)
router.post('/', userController.createBook, errorHandle)
router.get('/', userController.findBook, errorHandle)
router.get('/:id', userController.findBookOne, errorHandle)
router.put('/:id', userController.updateBook, errorHandle)
router.delete('/:id', userController.deleteBook, errorHandle)
router.use(wrongRoute)

module.exports = router;
