const mongoose = require('mongoose')
const bankSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true,
},
ircNo:{
    type:String,
    required:true,
},
tinNo:{
    type:String,
    required:true,
},
binNo:{
    type:String,
    required:true,

},
titleNo:{
    type:String,
    required:true,

},
vatNo:{
    type:String,
    required:true,

},
},{timestamps:true})
const bankModel = new mongoose.model('banks', bankSchema)
module.exports = bankModel

