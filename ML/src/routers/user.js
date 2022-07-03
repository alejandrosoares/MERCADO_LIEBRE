const express = require('express')
const routers = express.Router()
const userController = require('../controller/user')
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      let filePath = path.join(__dirname, '../../public/img/users')
      cb(null, filePath)
    },
    filename: function(req, file, cb) {
      let fileName = Date.now() + path.extname(file.originalname)
      cb(null, fileName)
    }
})

const upload = multer({ storage })

/* LOGIN */
routers.get('/login', userController.getLogin)
routers.post('/login', userController.postLogin)

/* REGISTER */
routers.get('/register', userController.getRegister)
routers.post('/register', upload.single('avatar'), userController.postRegister)

module.exports = routers