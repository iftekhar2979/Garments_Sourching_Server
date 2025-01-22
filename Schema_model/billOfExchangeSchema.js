const mongoose = require('mongoose')
const billOfExchangeSchema = new mongoose.Schema({
lcNumber:{
    type:String,
    required:true
},
lcIssuedDate:{
    type:String,
    required:true,
},
contactLcNo:{
    type:String,
    required:true,
},
lcDuration:{
    type:String,
    required:true,
},
piId:{
    type:[mongoose.Schema.Types.ObjectId],
    required:true,

},
},{timestamps:true})
const billOfExchangeModel = new mongoose.model('billOfExchange', billOfExchangeSchema)
module.exports = billOfExchangeModel

