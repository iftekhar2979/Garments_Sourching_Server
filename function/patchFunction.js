const chalanModel = require("../Schema_model/ChalanSchema")
const orderListModel = require("../Schema_model/OrderListSchema")
const deliveryDetailModel = require("../Schema_model/deliveredOrderSchema")
const sumObjectsByKey = require("../middleWare/sumObjectByKeys")
const detailsSizesAndDeliverySizes = require("./Reusable_Function/InputSizeAndDeliverySizeReducer")

 const editOrderDetail=async(req,res)=>{
    try{
        const requestedId=req.params.id
        const {details,grandRestTotal,grandTotalQuantity,grandDeliveryQuantity}=req.body
        detailsSizesAndDeliverySizes('deliverySize',details)
        detailsSizesAndDeliverySizes('size',details)
        detailsSizesAndDeliverySizes('restSize',details)
        // console.log(deliverySizes)
        const patchingData=await orderListModel.findByIdAndUpdate(requestedId,req.body,{
            new: true,
         })
       return  res.status(200).send(patchingData)
    }catch(error){
        return res.status(204).send({error:error.message})
    }

}
const editStatus=async(req,res)=>{
    try{
        const requestedId=req.params.id
       
        const patchingData=await orderListModel.findByIdAndUpdate(requestedId,req.body,{
            new: true,
         })
        return res.send(patchingData)
    }catch(error){
        console.log(error)
        return res.status(204).send({error:error.message})
    }
}
const editDeliveryMan=async(req,res)=>{
    const requestedId=req.params.id
     const body=req.body
   
     try{
         const patchingData=await deliveryDetailModel.findByIdAndUpdate(requestedId,body,{
             new: true,
          })
          return res.status(200).send(patchingData)
     }catch(error){
         console.log(error)
         return res.status(404).send({error:error.message})
 
     }
 }

 const increaseChalan=async(req,res)=>{
    const counterId=req.params.id
    const query=req.query

    try {
        const num = await chalanModel.findById(counterId)
        if(counterId==="645dcc1d5a65a1351c90c3bc"){
            const count = parseFloat(num.chalanNumber)
            const findChalanUpdate = await chalanModel.findByIdAndUpdate(counterId, { chalanNumber: count + 1 })
            return res.status(202).send(findChalanUpdate)
        }
        if(counterId==="6513dcf48ca7563803be1913"){
            const count=parseFloat(num?.piNumber)
            const findChalanUpdate = await chalanModel.findByIdAndUpdate(counterId, { piNumber: count + 1 })
            return res.status(202).send(findChalanUpdate)
        }
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
 }
 const decreaseChalan=async(req,res)=>{
    try {
        const num = await chalanModel.findById("645dcc1d5a65a1351c90c3bc")
        const count = parseFloat(num.chalanNumber)
        const findChalanUpdate = await chalanModel.findByIdAndUpdate('645dcc1d5a65a1351c90c3bc', { chalanNumber: count - 1 })
        return res.status(202).send(findChalanUpdate)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
 }

 const deleteDeliveryDetail=async(req,res)=>{
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
 }
module.exports={editOrderDetail,editStatus,editDeliveryMan,increaseChalan,decreaseChalan,deleteDeliveryDetail}