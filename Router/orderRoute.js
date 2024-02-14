
const express = require('express');
const { default: mongoose } = require('mongoose');
const orderListModel = require('../Schema_model/OrderListSchema');
const detailsSizesAndDeliverySizes = require('../function/Reusable_Function/InputSizeAndDeliverySizeReducer');
const deliveryDetailModel = require('../Schema_model/deliveredOrderSchema');
const chalanModel = require('../Schema_model/ChalanSchema');
const sumObjectsByKey = require('../middleWare/sumObjectByKeys');
const { getOrders, getFilterOrders, getSingleOrder } = require('../function/getFunctions');
const { protect } = require('../middleWare/protectMiddleware');
const { postCopyOrder } = require('../function/POST_METHOD/copyOrder');
const { editOrderDetail, editStatus } = require('../function/patchFunction');
const { editTotalOrderDetails } = require('../function/PutFunctions');
const { deleteFromDatabase } = require('../function/Reusable_Function/DeleteFromDatabase');
const router = new express.Router();


router.post('/order/copy/:id',protect,postCopyOrder)
router.post('/updateOrder/:id', async (req, res) => {
    const requestedId = req.params.id
    const { deliveryDetails, patchedOrderInfo } = req.body

    const counterId="645dcc1d5a65a1351c90c3bc"
  
    // console.log(patchedOrderInfo)
    const currentDate = new Date();
    const num = await chalanModel.findById(counterId)
    const count = parseFloat(num.chalanNumber)

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Update the Order
        const updatedOrder = await orderListModel.findByIdAndUpdate(
            requestedId, { ...patchedOrderInfo }, {
            new: true,
            upsert: true,
        });

        // Create new DeliveryDetails
        const deliveryDet = new deliveryDetailModel({
            ...deliveryDetails, createdAt: currentDate, chalanNumber: count
        });
        await deliveryDet.save();
        //update chalan
        const findChalanUpdate = await chalanModel.findByIdAndUpdate(counterId, { chalanNumber: count + 1 })

        // Commit the transaction
        await session.commitTransaction();
        res.status(200).send({isUpdated:true});
    } catch (error) {
        // Abort the transaction in case of an error
       
        await session.abortTransaction();
        res.status(500).send({error:error.message,isUpdated:false});
    }
})

router.get('/orderList',protect,getOrders)
//GETTING FILTERED DATA
router.get('/filterOrderList',protect,getFilterOrders)
//GET SINGLE ORDER LIST 
router.get('/orderList/:id',protect, getSingleOrder)
//SINGLE ORDER PUT THE TOTAL SIZE AND REST SIZE
router.put('/addTotalOrder/:id',protect, editOrderDetail)
//UPDATING THE COMPLETED DATE
router.put('/editDate/:id',protect, editOrderDetail)
//UPDATE THE ORDER
router.patch('/orderList/:id',protect,async(req,res)=>{
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

//FOR EVERY DELIVERY IT WILL EDIT TARGETED ORDER'S MAIN OBJECT
router.patch('/addTotalOrder/:id',protect, editTotalOrderDetails)
//CHANGING THE STATUS OF A SINGLE ORDER
router.patch('/editStatus/:id', protect,editStatus)


router.patch('/deleteDelivery',protect, async (req, res) => {
    const reqId = req.query.id
    const postId = req.query.postId
    const counterId="645dcc1d5a65a1351c90c3bc"

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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const patchingData=await orderListModel.findByIdAndUpdate(postId,findFromOrder,{
            new: true,
            upsert: true,
         })
        
         const deleteDelivery=await deliveryDetailModel.findByIdAndDelete(reqId)

        await session.commitTransaction();
        res.status(200).send({isUpdated:true});
    } catch (error) {
      // Abort the transaction in case of an error
       
      await session.abortTransaction();
      res.status(500).send({error:error.message,isUpdated:false});
    } 

})
router.delete('/deleteOrder',protect, async (req, res) => {
    deleteFromDatabase(orderListModel, res)
})
module.exports = router