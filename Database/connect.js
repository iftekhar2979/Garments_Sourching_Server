const mongoose=require('mongoose')
require('dotenv').config()
const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0iunmqq.mongodb.net/?retryWrites=true&w=majority`
// const stock_uri=`mongodb+srv://stocksystem:yWSBUd9Iuq0P9vpK@cluster0.qt4rsxi.mongodb.net/?retryWrites=true&w=majority`
// mongodb+srv://stocksystem:<password>@cluster0.qt4rsxi.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(uri,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log(err.message))