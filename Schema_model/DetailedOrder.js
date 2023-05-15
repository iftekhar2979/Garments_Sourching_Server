
const mongoose = require('mongoose')
const OrderDetailSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    buyerName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    orderedDate: {
        type: String,
        required: true
    },

    quantityOrder: [
        {
            style: { type: String, required: true },
            colorQuantity: { type: Number, required: true }
        }
    ],
    range: {
        type: String,
        required: true
    },
    sizeSystem: {
        type: String,
        required: true
    },
    sizeQuantities: {
        type: Number,
    },
    targetDate: {
        type: String,
        required: true
    },
    createdAt: {
        type: String
    },
    chalanNumber:{
        type:String,
        unique:true
    }
  

})
const orderDetailModel = new mongoose.model('OrderList', OrderDetailSchema)
module.exports = orderDetailModel 
