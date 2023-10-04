const mongoose = require('mongoose')
const piSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    piNumber:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    buyerName:{
        type:String,
        required:true
    },
    piValue:[
       { 
        productName:{
            type:String,
            required:true
        },
        length:{
            type:String,
          
        },
        color:{
            type:String,
        },
        size:{
            type:String
        },
        totalQuantity:{
            type:Number,
            required:true
        },
        perPics:{
            type:Number,
            required:true
        },
        amount:{
            type:Number,
            required:true
        }
    }
    ],
    tbNumbers:{
        type:Array,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    totalQuantity:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date
    }

})
const piModel = new mongoose.model('PI_collection', piSchema)
module.exports = piModel