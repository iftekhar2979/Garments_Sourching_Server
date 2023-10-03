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
            },
            deliveryStyleId:{
                type:String
            }
        }
    ],
    tbNumber:{
        type:String,
        required:true
    },
    completeDate:{
        type:Date,
        
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
    productName:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    orderNumber:{
        type:String,
        required:true
    },createdAt:{
        type:String
    },
    chalanNumber:{
        type:Number,
        unique:true
    },
    deliveryMan:{
        type:String
    }
})
const deliveryDetailModel = new mongoose.model('deliverDetail', deliveredDetailSchema)
module.exports = deliveryDetailModel