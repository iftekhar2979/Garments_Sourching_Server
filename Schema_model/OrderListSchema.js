const mongoose = require('mongoose')
const OrderListSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    shortForm:{
        type:String,
        required:true
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
    tbNumber:{
        type:String,
        required:true,
        validate: {
            validator: async function (tbNumber) {
              // Find the order with the same tbNumber
              const orderWithTbNumber = await mongoose.model('OrderList').findOne({ tbNumber });
      
              // If an order with the same tbNumber is found, check the companyName
              if (orderWithTbNumber) {
                const company = await mongoose.model('Company').findOne({ companyName: this.companyName });
      
                if (company && company.companyName !== orderWithTbNumber.companyName) {
                  return false; // Different companies can't have the same tbNumber
                }
              }
      
              return true; // The tbNumber is valid
            },
            message: 'Invalid tbNumber.',
          },
    },
    orderedDate: {
        type: Date,
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
        type: Date,
        required: true
    },
    createdAt: {
        type: Date
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
            poNumber:{
                type:String
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
        type: Date

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

    },
    cartoonSticker:{
        type:Boolean,
    }

})
const orderListModel = new mongoose.model('OrderList', OrderListSchema)
module.exports = orderListModel
