const mongoose = require('mongoose')
const deliveredDetailSchema = new mongoose.Schema({
    details:[
        {
            style:{
                type:String,
            },
            sizeName:{
                type:String,
            },
            size:{
                type:String,
            },
            
            colorName:{
                type:String,
                
            },
            deliveryQuantity:{
                type:Number,

            },
            deliverySize:{
                type:Object
            },
            restQuantity:{
                type:Number
            },
            restSize:{
                type:Object
            },
            size:{
                type:Object
            },
            totalQuantity:{
                type:Number
            }
        }
    ],
    completeDate:{
        type:String,
        
    },
    grandDeliveryQuantity:{
        type:Number,
        
    },
    grandRestQuantity:{
        type:Number,
        
    },
    deliveredAt:{
        type:String,
    },
    orderId:{
        type:String
    },
    orderNumber:{
        type:String
    },createdAt:{
        type:String
    },
    chalanNumber:{
        type:Number,
        unique:true
    }
})
const deliveryDetailModel = new mongoose.model('deliverDetail', deliveredDetailSchema)
module.exports = deliveryDetailModel