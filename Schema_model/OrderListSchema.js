const mongoose = require('mongoose')
const OrderListSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    location:{
        type:String,
        required:true
    },
    buyerName: {
        type: String,
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
    details: [
        {
            sizeName: {
                type: String,
                
            },
            style: {
                type: String,
            },
            size: {
                type: String,
            },
            colorName: {
                type: String,

            },
            deliveryQuantity: {
                type: Number,

            },
            deliverySize: {
                type: Object
            },
            restQuantity: {
                type: Number
            },
            restSize: {
                type: Object
            },
            size: {
                type: Object
            },
            totalQuantity: {
                type: Number
            },
            deliveryStyleId:{
                type:String
            }
            
        }
    ],
    adminNote: {
        type: String,
    },
    completeDate: {
        type: String,

    },
    grandDeliveryTotal: {
        type: Number,

    },
    grandRestQuantity: {
        type: Number,

    },
    grandTotalQuantity: {
        type: Number,

    },
    status: {
        type: String,

    }

})
const orderListModel = new mongoose.model('OrderList', OrderListSchema)
module.exports = orderListModel
