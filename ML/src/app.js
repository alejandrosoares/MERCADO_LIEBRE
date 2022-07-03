const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routers = require('./routers/index')
const publicPath = path.resolve(__dirname, '../public')
const app = express()

// MIDDLEWARE
app.set('PORT', process.env.PORT || 8000)
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routers)

app.listen(app.get('PORT'), () => {
    console.log('Servidor corriendo en puerto ' + app.get('PORT'))
})

app.get('/', (req, res) => {
    res.sendFile(templatePath('home'))
})


