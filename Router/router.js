
const express = require('express');
const { addCompany, addOrder, deliveryDetail, signUp, login, verifyJwt, getUser, refreshToken, postPI } = require('./../function/postFunctions')
const { getCompanyBuyers, getcompanyNames, getCompany, getProducts, removeProducts, getOrders, getSingleOrder, getDeliveryDetail, getSingleDeliverDetail, getFilteredLists, getPiByRange, getFilterOrders, getBuyers, getSearchedOrder } = require('./../function/getFunctions')
const { addProducts, editTotalOrderDetails } = require('../function/PutFunctions');
const { deleteFromDatabase, deleteOrderFromDatabase, deleteCompanyFromDatabase, deleteDeliveryDetailFromDatabase } = require('../function/Reusable_Function/DeleteFromDatabase');
const orderListModel = require('../Schema_model/OrderListSchema');
const { editOrderDetail, editStatus, editDeliveryMan, increaseChalan, decreaseChalan, deleteDeliveryDetail } = require('../function/patchFunction');
const { getProductSummary } = require('../function/summaryDatabase');
const {getDeliveryStateMent} =require('../function/GET_METHOD/deliveryStatement');
const { getUniqueTb } = require('../function/GET_METHOD/tblist');
const { getChalanList } = require('../function/GET_METHOD/chalanList');
const { getPiStatement, getPiList } = require('../function/GET_METHOD/piStatement');
// const deliveryMan = require('../Schema_model/DeliveryManSchema');
const deliveryMan = require('../Schema_model/DeliveryManSchema');
const { type } = require('express/lib/response');
const deliveryManModel = require('../Schema_model/DeliveryManSchema');
const { postCopyOrder } = require('../function/POST_METHOD/copyOrder');
// const { getUniqueTb }=require("../function/GET_METHOD/tbList")
const router = new express.Router();
router.get('/', async (req, res) => {
    res.send('this is new Server of erp')
})
//___________GET___________OPERATIONS______________
//GET THE COMPANIES BY GET API
router.get('/companies', getCompany)
//GET THE COMPANY NAMES AND LOCATION 
router.get('/companyNames', getcompanyNames)
//GET THE PRODUCT'S 
router.get('/products/:id', getProducts)
//GET ORDER LISTS
router.get('/orderList', getOrders)
//GET SINGLE ORDER LIST 
router.get('/orderList/:id', getSingleOrder)
//GET DELIVERY DETAILS OF AN ORDER
router.get('/deliveryDetail/:id', getDeliveryDetail)
//GET A SINGLE DELIVERY DETAIL OF AN ORDER
router.get('/singleDeliveryDetail/:id', getSingleDeliverDetail)
//GET FILTERED DATA
router.get('/orderList',getOrders)
//GETTING USER
// router.get('/user', verifyJwt,getUser)
//GETTING REFRESH TOKENS
// router.get('/refresh',refreshToken,verifyJwt,getUser)
// router.get('/')
//GETTING FILTERED DATA
router.get('/filterOrderList',getFilterOrders)
//GETTING PI DATA
router.post('/pi',getPiByRange)
router.get('/buyers',getBuyers)
router.get('/search',getSearchedOrder)
router.get('/tbList',getUniqueTb)
router.post('/deliveryStatement',getDeliveryStateMent)
router.get('/productSummary',getProductSummary)
router.get('/chalanLists',getChalanList)
router.get('/piStatement/:id',getPiStatement)
router.get('/piList',getPiList)
router.get('/deliveryMan/:id',async(req,res)=>{
    try {
        const requestedId = req.params.id
        // console.log(requestedId)
        const findingData = await deliveryManModel.findById(requestedId)
      
        return res.send(findingData)
      } catch (error) {
        return res.send({ error: error.message })
      }
})
//____________END_____GET_______________


//_____________POST____________OPERATIONS______________

//ADDING COMPANY URL
router.post('/addCompany', addCompany)
//GETING COMPNAY BUYER IN ADD ORDER IN FRONTEND
router.post('/companyBuyers', getCompanyBuyers)
//ADDING ORDER IN FRONTEND
router.post('/addOrder', addOrder)
//ADDING DELIVERY DETAILS
router.post('/deliverDetail', deliveryDetail)
//ADDING ORDER TO PI
router.post('/addPi',postPI)
router.post('/order/copy/:id',postCopyOrder)
//____________END_____POST_OPERATIONS_______________


//________________________PUT__________OPERATIONS____________________
//ADDING PRODUCTS API
router.put('/addProducts/:id', addProducts)
//SINGLE ORDER PUT THE TOTAL SIZE AND REST SIZE
router.put('/addTotalOrder/:id', editOrderDetail)
//UPDATING THE COMPLETED DATE
router.put('/editDate/:id', editOrderDetail)
//UPDATE THE ORDER
router.patch('/orderList/:id',async(req,res)=>{
    const requestedId=req.params.id
    const obj=req.body.object
    try{
        const patchingData=await orderListModel.findByIdAndUpdate(requestedId,obj,{
            new: true,
         })
        return res.status(200).send(patchingData)
    }catch(error){
        console.log(error)
        return res.status(204).send({error:error.message})
    }   
 
})
router.patch('/deliveryMan/:id',async(req,res)=>{
    try {
        const requestedId = req.params.id
      
        const puttingData = await deliveryManModel.findByIdAndUpdate(requestedId, { $push: { deliveryMan: { $each: req.body } } }, {
           new: true,
           upsert: true,
        })
  
        return res.send({ updated: true, puttingData })
     } catch (error) {
        return res.send({ error: error.message })
     }
})

//______END_____PUT_____OPERATIONS___________


//________________PATCH___________________OPERATIONS_________________________
//FOR EVERY DELIVERY IT WILL EDIT TARGETED ORDER'S MAIN OBJECT
router.patch('/addTotalOrder/:id', editTotalOrderDetails)
//CHANGING THE STATUS OF A SINGLE ORDER
router.patch('/editStatus/:id', editStatus)
//INCREASING CHALLAN NUMBER 
router.patch('/chalanNumber/:id', increaseChalan)
//DECREASING CHALLAN NUMBER
router.patch('/chalanNumberDecrement', decreaseChalan)
//EDITING DELIVERY MAN
router.patch('/selectDeliveryMan/:id', editDeliveryMan)
//WHEN WE REMOVE DELIVERY DETAILS IT WILL UPDATE THE TARGATED ORDER
router.patch('/deleteDeliveryDetail', deleteDeliveryDetail)
//____________END_____________PATCH__________OPERATIONS___________

//________________DELETE_________________OPERATIONS__________________
//REMOVING PRODUCT FROM PRODUCT LIST
router.delete('/products/:id', removeProducts)
//REMOVING ORDER FROM ORDER LIST
router.delete('/orderList', deleteOrderFromDatabase)
//REMOVE COMPANY FROM COMPANY LIST
router.delete('/companyList', deleteCompanyFromDatabase)

router.delete('/deleteOrder', async (req, res) => {
    deleteFromDatabase(orderListModel, res)
})
//REMOVE DELIVERY DETAIL'S FROM SINGLE ORDER OR TARGATED ORDER
router.delete('/deleteDeliveryDetail',deleteDeliveryDetailFromDatabase)

//_________END_____DELETE___________OPERATIONS_____________
module.exports = router