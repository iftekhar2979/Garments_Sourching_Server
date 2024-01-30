
const express = require('express');
const { default: mongoose } = require('mongoose');
const orderListModel = require('../Schema_model/OrderListSchema');
const detailsSizesAndDeliverySizes = require('../function/Reusable_Function/InputSizeAndDeliverySizeReducer');
const deliveryDetailModel = require('../Schema_model/deliveredOrderSchema');
const chalanModel = require('../Schema_model/ChalanSchema');
const sumObjectsByKey = require('../middleWare/sumObjectByKeys');
const router = new express.Router();

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

router.patch('/deleteDelivery', async (req, res) => {
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
module.exports = router