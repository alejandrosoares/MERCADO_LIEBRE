const express = require('express')
const routers = express.Router()


routers.use('/user', require('./user'))

module.exports = routers