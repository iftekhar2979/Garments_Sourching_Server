
const express = require('express');
const { addCompany, addOrder, deliveryDetail,  login, verifyJwt, getUser,  postPI, refreshToken } = require('./../function/postFunctions')
const { getCompanyBuyers, getcompanyNames, getCompany, getProducts, removeProducts, getOrders, getSingleOrder, getDeliveryDetail, getSingleDeliverDetail, getFilteredLists, getPiByRange, getFilterOrders, getBuyers, getSearchedOrder } = require('./../function/getFunctions')
const { addProducts, editTotalOrderDetails } = require('../function/PutFunctions');
const { deleteFromDatabase, deleteOrderFromDatabase, deleteCompanyFromDatabase, deleteDeliveryDetailFromDatabase } = require('../function/Reusable_Function/DeleteFromDatabase');
const orderListModel = require('../Schema_model/OrderListSchema');
const { editOrderDetail, editStatus, editDeliveryMan, increaseChalan, decreaseChalan, deleteDeliveryDetail } = require('../function/patchFunction');
const { getProductSummary } = require('../function/summaryDatabase');
const {getDeliveryStateMent} =require('../function/GET_METHOD/deliveryStatement');
<<<<<<< HEAD
// const { getUniqueTb } = require('../function/GET_METHOD/tbList');
const { getChalanList } = require('../function/GET_METHOD/chalanList');
const { getPiStatement, getPiList, getUniqueTb, getAllTbLists } = require('../function/GET_METHOD/piStatement');
const piModel = require("../Schema_model/PiSchema")
const deliveryManModel = require('../Schema_model/DeliveryManSchema');
const { postCopyOrder } = require('../function/POST_METHOD/copyOrder');
const { piNamePatch } = require('../function/PATCH_METHOD/PiPatch');
const { deletePi } = require('../function/DELETE_METHOD/DeletePi');
const { protect } = require('../middleWare/protectMiddleware');
=======

const { getChalanList } = require('../function/GET_METHOD/chalanList');
const { getPiStatement, getPiList } = require('../function/GET_METHOD/piStatement');
// const deliveryMan = require('../Schema_model/DeliveryManSchema');
const deliveryManModel = require('../Schema_model/DeliveryManSchema');
const { getUniqueTb } = require('../function/GET_METHOD/tblist');
>>>>>>> 0acc11ed79fd36ea0184aaf26d17717b86606a48
// const { getUniqueTb }=require("../function/GET_METHOD/tbList")
const router = new express.Router();
router.get('/', async (req, res) => {
    res.send('this is new Server of erp')
})
//___________GET___________OPERATIONS______________
//GET THE COMPANIES BY GET API
router.get('/companies',protect, getCompany)
//GET THE COMPANY NAMES AND LOCATION 
router.get('/companyNames',protect, getcompanyNames)
//GET THE PRODUCT'S 
router.get('/products/:id',protect, getProducts)
//GET ORDER LISTS
// router.get('/orderList',protect, getOrders)

//GET DELIVERY DETAILS OF AN ORDER
router.get('/deliveryDetail/:id',protect, getDeliveryDetail)
//GET A SINGLE DELIVERY DETAIL OF AN ORDER
router.get('/singleDeliveryDetail/:id',protect, getSingleDeliverDetail)


//GETTING PI DATA
<<<<<<< HEAD
router.post('/pi',protect,getPiByRange)
router.get('/buyers',protect,getBuyers)
router.get('/search',protect,getSearchedOrder)
router.get('/tbList',protect,getAllTbLists)
router.post('/deliveryStatement',protect,getDeliveryStateMent)
router.get('/productSummary',protect,getProductSummary)
router.get('/chalanLists',protect,getChalanList)
router.get('/piStatement/:id',protect,getPiStatement)
router.get('/piList',protect,getPiList)

=======
router.post('/pi',getPiByRange)
router.get('/buyers',getBuyers)
router.get('/search',getSearchedOrder)
// router.get('/tbList',getUniqueTb)
router.post('/deliveryStatement',getDeliveryStateMent)
router.get('/productSummary',getProductSummary)
router.get('/chalanLists',getChalanList)
router.get('/piStatement/:id',getPiStatement)
router.get('/piList',getPiList)
>>>>>>> 0acc11ed79fd36ea0184aaf26d17717b86606a48
router.get('/deliveryMan/:id',async(req,res)=>{
    try {
        const requestedId = req.params.id
        // console.log(requestedId)
        const findingData = await deliveryManModel.findById(requestedId)
<<<<<<< HEAD
=======
      
>>>>>>> 0acc11ed79fd36ea0184aaf26d17717b86606a48
        return res.send(findingData)
      } catch (error) {
        return res.send({ error: error.message })
      }
})
<<<<<<< HEAD
//____________END_____GET_____________________
=======
//____________END_____GET_______________
>>>>>>> 0acc11ed79fd36ea0184aaf26d17717b86606a48


//____________POST____OPERATIONS______________

//ADDING COMPANY URL
router.post('/addCompany',protect, addCompany)
//GETING COMPNAY BUYER IN ADD ORDER IN FRONTEND
router.post('/companyBuyers',protect, getCompanyBuyers)
//ADDING ORDER IN FRONTEND
router.post('/addOrder', protect,addOrder)
//ADDING DELIVERY DETAILS
router.post('/deliverDetail', protect,deliveryDetail)
//ADDING ORDER TO PI
router.post('/addPi',protect,postPI)

//____________END_____POST_OPERATIONS_______________


//________________________PUT__________OPERATIONS____________________
//ADDING PRODUCTS API
router.put('/addProducts/:id',protect, addProducts)


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
<<<<<<< HEAD
router.patch('/piName/:id',protect,piNamePatch)
=======
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
>>>>>>> 0acc11ed79fd36ea0184aaf26d17717b86606a48

//______END_____PUT_____OPERATIONS___________


//________________PATCH___________________OPERATIONS_________________________

//INCREASING CHALLAN NUMBER 
router.patch('/chalanNumber/:id',protect, increaseChalan)
//DECREASING CHALLAN NUMBER
router.patch('/chalanNumberDecrement',protect, decreaseChalan)
//EDITING DELIVERY MAN
router.patch('/selectDeliveryMan/:id',protect, editDeliveryMan)
//WHEN WE REMOVE DELIVERY DETAILS IT WILL UPDATE THE TARGATED ORDER
router.patch('/deleteDeliveryDetail', deleteDeliveryDetail)
//____________END_____________PATCH__________OPERATIONS___________

//________________DELETE_________________OPERATIONS_______________
//REMOVING PRODUCT FROM PRODUCT LIST
router.delete('/products/:id',protect, removeProducts)
//REMOVING ORDER FROM ORDER LIST
router.delete('/orderList',protect, deleteOrderFromDatabase)
//REMOVE COMPANY FROM COMPANY LIST
router.delete('/companyList', protect,deleteCompanyFromDatabase)


router.delete('/deletePi',protect,deletePi)
//REMOVE DELIVERY DETAIL'S FROM SINGLE ORDER OR TARGATED ORDER
router.delete('/deleteDeliveryDetail',protect,deleteDeliveryDetailFromDatabase)

//_________END_____DELETE___________OPERATIONS_____________
module.exports = router