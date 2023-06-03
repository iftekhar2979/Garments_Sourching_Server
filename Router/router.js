
const express = require('express');
const { addCompany, addOrder, deliveryDetail, signUp, login, verifyJwt, getUser, refreshToken } = require('./../function/postFunctions')

const { getCompanyBuyers, getcompanyNames, getCompany, getProducts, removeProducts, getOrders, getSingleOrder, getDeliveryDetail, getSingleDeliverDetail } = require('./../function/getFunctions')
const companyModel = require('../Schema_model/CompanySchema');
const { addProducts, editTotalOrderDetails } = require('../function/PutFunctions');
const { deleteFromDatabase, deleteOrderFromDatabase, deleteCompanyFromDatabase, deleteDeliveryDetailFromDatabase } = require('../function/Reusable_Function/DeleteFromDatabase');
const orderListModel = require('../Schema_model/OrderListSchema');
const { editOrderDetail, editStatus, editDeliveryMan } = require('../function/patchFunction');

const chalanModel = require('../Schema_model/ChalanSchema');
const deliveryDetailModel = require('../Schema_model/deliveredOrderSchema');
const { ObjectId } = require('mongodb');
const sumObjectsByKey = require('../middleWare/sumObjectByKeys');
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


//put Operation
router.put('/addProducts/:id', addProducts)
router.put('/addTotalOrder/:id', editTotalOrderDetails)
router.put('/editDate/:id', editOrderDetail)
//patch operation
router.patch('/addTotalOrder/:id', editOrderDetail)
router.patch('/editStatus/:id', editStatus)
router.patch('/chalanNumber', async (req, res) => {
    try {
        const num = await chalanModel.findById("645dcc1d5a65a1351c90c3bc")
        const count = parseFloat(num.chalanNumber)
        const findChalanUpdate = await chalanModel.findByIdAndUpdate('645dcc1d5a65a1351c90c3bc', { chalanNumber: count + 1 })
        return res.status(202).send(findChalanUpdate)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
})
router.patch('/selectDeliveryMan/:id', editDeliveryMan)



router.patch('/deleteDeliveryDetail', async (req, res) => {
    const reqId = req.query.id
    const postId = req.query.postId
    try{
    const findFromDelivery = await deliveryDetailModel.findById(reqId)
    const findFromOrder = await orderListModel.findById(postId)
    const findDocDetails = findFromDelivery?.details
    const findOrderDetails = findFromOrder?.details
    findOrderDetails?.forEach(item => {        
        findDocDetails.forEach(deliveryItem => {
            if (JSON.stringify(item.deliveryStyleId) === JSON.stringify(deliveryItem.deliveryStyleId)) {
                item.restSize = sumObjectsByKey(deliveryItem.deliverySize, item.restSize)
                item.restQuantity = item.restQuantity + deliveryItem.deliveryQuantity  
            }
            item.deliveryQuantity = 0
            item.deliverySize={}
        })
    })
    const reduced = findDocDetails?.reduce((acc, cur) => {
        return acc + cur.deliveryQuantity
    }, 0)
    findFromOrder.grandRestQuantity = findFromOrder.grandRestQuantity + reduced
    const patchingData=await orderListModel.findByIdAndUpdate(postId,findFromOrder,{
        new: true,
        upsert: true,
     })
    return res.status(200).send({isUpdated:true,patchingData})
    }catch(err){
        return res.status(304).send({error:err.message})
    }
    
})

//delete Operation
router.delete('/products/:id', removeProducts)
router.delete('/orderList', deleteOrderFromDatabase)
router.delete('/companyList', deleteCompanyFromDatabase)
router.delete('/deleteOrder', async (req, res) => {
    deleteFromDatabase(orderListModel, res)
})
router.delete('/deleteDeliveryDetail',deleteDeliveryDetailFromDatabase)
module.exports = router