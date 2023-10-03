
const companyModel = require("../Schema_model/CompanySchema");
var jwt = require('jsonwebtoken')
const postInDatabase = require('./Reusable_Function/postInDatabase');
const orderListModel = require('../Schema_model/OrderListSchema');
const deliveryDetailModel = require("../Schema_model/deliveredOrderSchema");
const detailsSizesAndDeliverySizes = require("./Reusable_Function/InputSizeAndDeliverySizeReducer");
const moment = require('moment');
const userModel = require("../Schema_model/userModel");
const bcrypt = require('bcryptjs');
const chalanModel = require("../Schema_model/ChalanSchema");
const piModel = require("../Schema_model/PiSchema");


const JWT_SECRET_KEY = '500f11bf61b94c3be5185adbf0aa5a75c37374740118103487572f0a3ffe2d98a707f479e61a66cb34dff1157f11819f678bc89404e38eebf4c580519c0dcec9'
module.exports = JWT_SECRET_KEY
const addCompany = async (req, res) => {
  const body = req.body
  console.log(body)
  postInDatabase(companyModel, body, res, 200)

}
const addOrder = async (req, res) => {
  const body = req.body
  postInDatabase(orderListModel, body, res, 200)
}
const deliveryDetail = async (req, res) => {
  const body = req.body

  console.log(body)
  const { details } = body
  detailsSizesAndDeliverySizes('deliverySize', details)
  detailsSizesAndDeliverySizes('size', details)
  // detailsSizesAndDeliverySizes('restSize', details)

  //chalan number increment and edit
  const num = await chalanModel.findById("645dcc1d5a65a1351c90c3bc")
  const count = parseFloat(num.chalanNumber)
  if (count) {
    try {
      const currentDate=new Date();
      const postingData = new deliveryDetailModel({ ...body, createdAt: currentDate, chalanNumber: count });
      const savePostingData = await postingData.save();
      return res.status(202).send(savePostingData);
    } catch (error) {
      let statusCode = 500
      if (error.code === 11000) {
        return res.status(statusCode).send({ error: 'You Have Added that Challan' })
      }
      statusCode = 404
      return res.status(statusCode).send({ error: error.message });
    }
  }
}
const postPI=async(req,res)=>{
  const body = req.body
 postInDatabase(piModel,body,res,202)
}

// const signUp = async (req, res) => {
//   const { name, email, password } = req.body
//   const findEmailUnique = await userModel.findOne({ email })
//   if (findEmailUnique) {
//     return res.status(400).send({ message: 'Email is already registered' })
//   }
//   const hashPassword = bcrypt.hashSync(password)
//   const user = new userModel({ name, email, password: hashPassword })
//   try {
//     await user.save()
//     return res.status(200).send({ message: 'Succesfully Registered', user })
//   } catch (error) {
//     console.log(error)
//     return res.status(400).send({ message: 'Registration Failed' })
//   }
// }
// const login = async (req, res) => {
//   const { name, email, password } = req.body
//   let existingUser;
//   try {
//     existingUser = await userModel.findOne({ email })

//   } catch (error) {
//     return new Error(error)
//   }
//   if (!existingUser) {
//     return res.status(404).send({ message: 'User Not Found' })
//   }
//   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
//   if (!isPasswordCorrect) {
//     return res.status(401).send({ message: 'Invalid Email and Password' })
//   }
//   const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, { expiresIn: '30s' })

//   if(req.cookies[`${existingUser._id}`]){
//     req.cookies[`${existingUser._id}`]=''
//   }

//   res.cookie(String(existingUser._id), token, {
//     path: '/',
//     expiresIn: new Date(Date.now() + 1000 * 30),
//     httpOnly: true,
//     sameSite: 'lax'
//   })
//   return res.status(200).send({ message: 'Succefully Logged In', existingUser, token })
// }

// const verifyJwt = async (req, res, next) => {
//   const cookies = req.headers?.cookie;
//     const token = cookies.split('=')[1]
//   if (!token) {
//     return res.status(404).send({ message: 'No Token Found' })
//   }
//   jwt.verify(String(token), JWT_SECRET_KEY, (error, decoded) => {
//     if (error) {
//       return res.status(401).send({ message: error.message })
//     }
//     req.id = decoded.id

//     next()
//   })
// }
// const getUser = async (req, res, next) => {
//   const userId = req.id
//   let user;
//   try {
//     user = await userModel.findById(userId, '-password')
//   } catch (error) {
//     return new Error(error)
//   }
//   if (!user) {
//     return res.status(404).send({ message: 'User not Found' })
//   }
//   return res.status(200).send(user)
// }
// const refreshToken = (req, res, next) => {
//   const cookies = req.headers.cookie
//   const prevToken = cookies.split('=')[1]
//   if (!prevToken) {
//     return res.status(400).send({ message: 'Could not find the token' })
//   }
// console.log(String(prevToken))
//   jwt.verify(String(prevToken), JWT_SECRET_KEY, (error, decoded) => {
//     if (error) {
//       console.log(error)
//       return res.status(403).send({ message: 'Authentication failed' })

//     }
//     console.log('decode',decoded.id)
//     res.clearCookie(`${decoded.id}`)
//     req.cookies[`${decoded.id}`] = ''
//     const token = jwt.sign({ id: decoded.id }, JWT_SECRET_KEY, { expiresIn: '30s' })
//     console.log("Regen/n",token)
//     res.cookie(String(decoded.id), token, {
//       path: '/',
//       expiresIn: new Date(Date.now() + 1000 * 30),
//       httpOnly: true,
//       sameSite: 'lax'
//     })
//     req.id = decoded.id
//     next()
//   })

// }
module.exports = { addCompany,postPI, addOrder, deliveryDetail, }