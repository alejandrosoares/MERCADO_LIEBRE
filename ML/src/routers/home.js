const express = require('express')
const routers = express.Router()
const homeController = require('../controller/home')


routers.get('/', homeController.home)

module.exports = routers