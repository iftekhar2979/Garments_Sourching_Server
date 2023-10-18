
const mongoose = require('mongoose')
const deliveryManSchema = new mongoose.Schema({
    deliveryMan:{
        type:Array
    }
})
const deliveryManModel = new mongoose.model('deliveryMen', deliveryManSchema)
module.exports = deliveryManModel