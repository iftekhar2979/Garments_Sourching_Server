const mongoose=require('mongoose')
const ChalanSchema=new mongoose.Schema({
    chalanNumber:{
        type:String
    }
})
const chalanModel = new mongoose.model('chalan', ChalanSchema)
module.exports = chalanModel