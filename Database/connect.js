const mongoose=require('mongoose')
require('dotenv').config()

let uri
if(process.env.NODE_ENV==="Production"){
   uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0iunmqq.mongodb.net/?retryWrites=true&w=majority`
    
}else{
    uri="mongodb://127.0.0.1:27017"
}
mongoose.connect(uri,{
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log(err))