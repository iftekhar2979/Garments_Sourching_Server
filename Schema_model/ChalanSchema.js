const mongoose=require('mongoose')
const ChalanSchema=new mongoose.Schema({
    chalanNumber:{
        type:Number
    }
})
const chalanModel = new mongoose.model('chalan', ChalanSchema)
module.exports = chalanModel