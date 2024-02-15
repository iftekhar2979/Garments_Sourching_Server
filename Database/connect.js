const mongoose=require('mongoose')
require('dotenv').config()
<<<<<<< HEAD

// const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0iunmqq.mongodb.net/?retryWrites=true&w=majority`
const uri="mongodb://127.0.0.1:27017"
=======
// node js 5.5 or later

const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0iunmqq.mongodb.net/?retryWrites=true&w=majority`

>>>>>>> 0acc11ed79fd36ea0184aaf26d17717b86606a48

mongoose.connect(uri,{
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log(err))
