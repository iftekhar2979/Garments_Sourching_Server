const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const router = require("./Router/router")
const orderRouter=require('./Router/orderRoute')
const userRoute=require("./Router/userRoutes")
const seasonRoute=require("./Router/SeasonRoute")
const cors = require('cors')
var cookieParser = require('cookie-parser')

require("./Database/connect")
require('dotenv').config()
let corsOptions ;
if(process.env.NODE_ENV==="Production"){
  corsOptions = {
    credentials: true, origin:process.env.ORIGIN_URL
  };
}else{
  corsOptions = {
    credentials: true, origin:true
  };
}

app.use(cors(corsOptions))
app.use(express.json())
// app.options('*', cors()); 
app.use(cookieParser())
app.use(express.urlencoded());
app.use(router)
app.use(seasonRoute)
app.use(orderRouter)
app.use(userRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})