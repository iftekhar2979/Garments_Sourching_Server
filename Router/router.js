
const express = require('express');
const { addCompany, addOrder, deliveryDetail } = require('./../function/postFunctions')

const { getCompanyBuyers, getcompanyNames, getCompany, getProducts, removeProducts, getOrders, getSingleOrder, getDeliveryDetail, getSingleDeliverDetail } = require('./../function/getFunctions')
const companyModel = require('../Schema_model/CompanySchema');
const { addProducts, editTotalOrderDetails } = require('../function/PutFunctions');
const { deleteFromDatabase, deleteOrderFromDatabase } = require('../function/Reusable_Function/DeleteFromDatabase');
const orderListModel = require('../Schema_model/OrderListSchema');
const { editOrderDetail, editStatus } = require('../function/patchFunction');
const { Collection } = require('mongoose');
const chalanModel = require('../Schema_model/ChalanSchema');
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
// router.get('/')
//post Operation
router.post('/addCompany', addCompany)
router.post('/companyBuyers', getCompanyBuyers)
router.post('/addOrder', addOrder)
router.post('/deliverDetail', deliveryDetail)
router.post('/chalanNumber', async (req, res) => {
    try {
        let number = 000 - 00
        const postChalan = new chalanModel({ chalanNumber: number })
        const savePostingData = await postChalan.save();
        return res.status(200).send(savePostingData)
    } catch (error) {
        console.log(error)
    }

})

//put Operation
router.put('/addProducts/:id', addProducts)
router.put('/addTotalOrder/:id', editTotalOrderDetails)
router.put('/editDate/:id', editOrderDetail)
//patch operation
router.patch('/addTotalOrder/:id', editOrderDetail)
router.patch('/editStatus/:id', editStatus)
router.patch('/chalanNumber/:id', async (req, res) => {
    try {
        const chalanId = req.params.id
        // console.log(chalanId)
        // const date=new Date()
        // const getYear=date.getFullYear()
        // const str=String(getYear)
        console.log(typeof str)
const findOne=await chalanModel.findById(chalanId)
const {chalanNumber}=findOne

const incrementNumber=parseFloat(chalanNumber)+1
// console.log(incrementNumber)
        const find=await chalanModel.findByIdAndUpdate(chalanId,{chalanNumber:incrementNumber},{
            new: true,
         })
       res.send(find)
    } catch (error) {
        console.log(error)
    }
})
//delete Operation
router.delete('/products/:id', removeProducts)
router.delete('/orderList', deleteOrderFromDatabase)
router.delete('/deleteOrder', async (req, res) => {
    deleteFromDatabase(orderListModel, res)
})
module.exports = router