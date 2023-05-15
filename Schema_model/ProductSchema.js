const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    products: {
        type: Array
    }
})
const productModel = new mongoose.model('products', productSchema)
module.exports = productModel