const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const companyModel = require('./CompanySchema');
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
    season:{
        type:String
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
OrderListSchema.pre('save', async function (next) {
    const order = this;

    // Find the company by its shortForm or companyName
    const company = await companyModel.findOne({companyName: order.companyName });
 
    if (!company) {
      throw new Error('Company not found');
    }
  
    // Check if the buyerName is in the company's buyers array
    if (!company.buyers.includes(order.buyerName)) {
      throw new Error('Buyer does not belong to the specified company');
    }
  
    next();
  });
  
const orderListModel = new mongoose.model('OrderList', OrderListSchema)
module.exports = orderListModel
