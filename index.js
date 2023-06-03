const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const router = require("./Router/router")
const cors = require('cors')
var cookieParser = require('cookie-parser')
require("./Database/connect")
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.options('*', cors()); 
app.use(cookieParser())
app.use(express.urlencoded());
app.use(router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})