const { ObjectId } = require("mongodb");
const orderListModel = require("../../Schema_model/OrderListSchema")

const postCopyOrder=async(req,res)=>{
    try{
        const currentDate=new Date();
        const orderNum=req.params.id
        console.log(orderNum)
        // console.log()
        const findTheOrder= await orderListModel.findById(orderNum)
        
        // findTheOrder.orderNumber=`${findTheOrder?.orderNumber}-copied`
        // findTheOrder.createdAt=currentDate
        // delete findTheOrder?._id
const {companyName,shortForm,location,buyerName,productName,orderNumber,quantityOrder,range,sizeSystem,sizeQuantities,targetDate,createdAt,details,grandRestQuantity,grandTotalQuantity,orderedDate,tbNumber}=findTheOrder
            const order={companyName,shortForm,location,buyerName,productName,orderNumber:`${orderNumber}-copied`,quantityOrder,range,sizeSystem,sizeQuantities,orderedDate,tbNumber,targetDate,createdAt:currentDate,details,grandRestQuantity,grandTotalQuantity}
        console.log(order)
        
    
            const postingData = new orderListModel(order);
            const savePostingData = await postingData.save();
          return  res.status(202).send(savePostingData)
       
        
    }catch(error){
        console.log(error)
        return  res.status(404).send(error)

    }
}
module.exports={postCopyOrder}