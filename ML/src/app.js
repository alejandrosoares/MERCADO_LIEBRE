const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routers = require('./routers/index')
const publicPath = path.resolve(__dirname, '../public')
const app = express()

/* MIDDLEWARE */
app.set('PORT', process.env.PORT || 8000)
app.use(express.urlencoded({extended: false}))
app.use('/', routers)

/* STATIC */
app.use(express.static(publicPath))

/* TEMPLATE ENGINE */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'));

/* LISTER SERVER */
app.set('PORT', process.env.PORT || 8000)
app.listen(app.get('PORT'), () => {
    console.log('Servidor corriendo en puerto ' + app.get('PORT'))
})


