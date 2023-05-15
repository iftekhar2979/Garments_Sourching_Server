const mongoose=require('mongoose')
const CompanySchema=new mongoose.Schema({
companyName:{
    type:String,
    required:true,
    unique:true
},
location:{
    type:String,
    required:true
},
contact:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
buyers:{
    type:Array,
    required:true
},
createdAt:{
    type:String,
}

})
const companyModel=new mongoose.model('Company',CompanySchema)
module.exports=companyModel
