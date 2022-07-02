const express = require('express')
const path = require('path')
const {templatePath} = require('./helpers/templatePath')
const bodyParser = require('body-parser')
const publicPath = path.resolve(__dirname, 'public')
const app = express()

// MIDDLEWARE
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('PORT', process.env.PORT || 3000)

app.listen(app.get('PORT'), () => {
    console.log('Servidor corriendo en puerto ' + app.get('PORT'))
})

app.get('/', (req, res) => {
    res.sendFile(templatePath('home'))
})

app.get('/login', (req, res) => {
    res.sendFile(templatePath('login'))
})

app.post('/login', (req, res) => {
    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.sendFile(templatePath('register'))
})

app.post('/register', (req, res) => {
    res.redirect('/')
})

