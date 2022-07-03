const categoryModel = require('../models/category')

const homeController = {
    
    home: (req, res) => {
        res.render('home')
    }
}

module.exports = homeController