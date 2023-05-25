const mongoose=require('mongoose')
require('dotenv').config()
const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0iunmqq.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(uri,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log('error')+err.message)