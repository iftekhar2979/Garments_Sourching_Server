
const express = require('express');
const { addCompany, addOrder, deliveryDetail, signUp, login, verifyJwt, getUser, refreshToken } = require('./../function/postFunctions')

const { getCompanyBuyers, getcompanyNames, getCompany, getProducts, removeProducts, getOrders, getSingleOrder, getDeliveryDetail, getSingleDeliverDetail } = require('./../function/getFunctions')
const companyModel = require('../Schema_model/CompanySchema');
const { addProducts, editTotalOrderDetails } = require('../function/PutFunctions');
const { deleteFromDatabase, deleteOrderFromDatabase, deleteCompanyFromDatabase } = require('../function/Reusable_Function/DeleteFromDatabase');
const orderListModel = require('../Schema_model/OrderListSchema');
const { editOrderDetail, editStatus } = require('../function/patchFunction');

const chalanModel = require('../Schema_model/ChalanSchema');
const deliveryDetailModel = require('../Schema_model/deliveredOrderSchema');
const { ObjectId } = require('mongodb');
;
const router = new express.Router();

router.get('/', async (req, res) => {
    res.send('this is new Server of erp')
})
//get Operations
router.get('/companies', getCompany)
router.get('/companyNames', getcompanyNames)
router.get('/products/:id', getProducts)
router.get('/orderList', getOrders)
router.get('/orderList/:id', getSingleOrder)
router.get('/deliveryDetail/:id', getDeliveryDetail)
router.get('/singleDeliveryDetail/:id', getSingleDeliverDetail)
// router.get('/user', verifyJwt,getUser)
// router.get('/refresh',refreshToken,verifyJwt,getUser)
// router.get('/')
//post Operation
router.post('/addCompany', addCompany)
router.post('/companyBuyers', getCompanyBuyers)
router.post('/addOrder', addOrder)
router.post('/deliverDetail', deliveryDetail)
// router.post('/signup', signUp)
// router.post('/login', login)

//put Operation
router.put('/addProducts/:id', addProducts)
router.put('/addTotalOrder/:id', editTotalOrderDetails)
router.put('/editDate/:id', editOrderDetail)
//patch operation
router.patch('/addTotalOrder/:id', editOrderDetail)
router.patch('/editStatus/:id', editStatus)
router.patch('/deleteDeliveryDetail', async (req, res) => {
    const reqId = req.query.id
    const postId = req.query.postId
    const findDoc = await orderListModel.findById(reqId)
    const totalOrder = await deliveryDetailModel.find({ orderId: reqId })
    const findItem = totalOrder?.find(item => {
        return JSON.stringify(item._id) === JSON.stringify(postId)
    })
    const findDocDetails=findDoc?.details
    const findItemDetails=findItem?.details
    findDocDetails.forEach(item=>{
        console.log('finddoc',item)
    })
    // console.log(findItemDetails)
    findItemDetails?.forEach(item=>{
        console.log('findItem',item)
    })
  
})

//delete Operation
router.delete('/products/:id', removeProducts)
router.delete('/orderList', deleteOrderFromDatabase)
router.delete('/companyList', deleteCompanyFromDatabase)
router.delete('/deleteOrder', async (req, res) => {
    deleteFromDatabase(orderListModel, res)
})
router.delete('/deleteChalans',async(req,res)=>{
    const del=await deliveryDetailModel.deleteMany({})
    res.send(del)
})
module.exports = router