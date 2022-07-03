const express = require('express')
const routers = express.Router()

routers.use('/', require('./home'))

routers.use('/user', require('./user'))

module.exports = routers