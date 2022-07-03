const userModel = require('../models/user')
const getViewPath = view => `user/${view}`

const userController = {

    getRegister: (req, res) => {
        res.render(getViewPath('register'))
    },

    postRegister: (req, res) => {
        const response = userModel.register(req.body , req.file)

        if (!response.error) {
            res.redirect('/user/login')
        } else {
            const locals = {
                error: response.error,
                body: req.body
            }
            res.render(getViewPath('register'), locals) 
        }
    },

    getLogin: (req, res) => {
        res.render(getViewPath('login'))
    },

    postLogin: (req, res) => {
        const body = req.body
        const response = userModel.login(body.email, body.password)
        
        if (!response.error) {
            res.redirect('/home')
        } else {
            const locals = {
                error: response.error,
                body
            }
            res.render(getViewPath('login'), locals)
        }
    }
}

module.exports = userController