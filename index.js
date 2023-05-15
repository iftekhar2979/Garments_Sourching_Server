const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const router=require("./Router/router")
const cors=require('cors')
require("./Database/connect")
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(router)
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })