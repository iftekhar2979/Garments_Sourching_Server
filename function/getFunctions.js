const { CURSOR_FLAGS } = require("mongodb");
const companyModel = require("../Schema_model/CompanySchema");
const getFromDatabase = require("./Reusable_Function/getFormDatabase");
const getQueryFromDatabase = require("./Reusable_Function/getQueryFromDatabase");
const productModel = require("../Schema_model/ProductSchema");
const orderListModel = require("../Schema_model/OrderListSchema");
const deliveryDetailModel = require("../Schema_model/deliveredOrderSchema");

// get from database function

const getCompany = async (req, res) => {
  getFromDatabase(companyModel, res, 200)
}

const getcompanyNames = async (req, res) => {
  try {
    const findingData = await companyModel.find({})
    const companyNames = findingData.map(item => {
      return {companyName:item.companyName,
        location:item.location}})

    return res.status(200).send(companyNames)
  } catch (error) {

    return res.status(404).send({ error: error.message })
  }

}


const getCompanyBuyers = async (req, res) => {
  try {
    const query = req.query?.companyBuyers

    const findingData = await companyModel.findOne({ companyName: query })
 
    return res.status(200).send(findingData?.buyers)
  } catch (error) {
    return res.status(404).send({ error: error.message })
  }
}

const getProducts=async(req,res)=>{
  try{
    const requestedId=req.params.id
    const findingData=await productModel.findById(requestedId)
    return res.send(findingData)
  }catch(error){
    return res.send({error:error.message})
  }
}
const removeProducts=async(req,res)=>{
  try{
    const query=req.query.productName
    const id=req.params.id
    console.log(id,query)
    const findData=await productModel.findByIdAndUpdate(id,{ $pull: { products:query} },{
      new: true,
      upsert: true,
  })
 return res.status(200).send({isUpdated:true,findData})
  }catch(error){
    return res.status(200).send({error:error.message})
  }
}

const getOrders=async(req,res)=>{
  const page=parseFloat(req.query.page)
  
  try {
    const findingData= await orderListModel.find({}).limit(10).skip(10*page)
    const count=await orderListModel?.estimatedDocumentCount()
   
     return res.status(200).send({documentCount:count,findingData});
   } catch (error) {
     if(error) statusCode=404
     console.log(error)
     return res.status(statusCode).send({ error: error.message });
   }
 
}
const getSingleOrder=async(req,res)=>{
  const requestedId=req.params.id
  getQueryFromDatabase(orderListModel,requestedId,res,200)
}
const getDeliveryDetail=async(req,res)=>{
  try{
    const requestedId=req.params.id
    const findingData=await deliveryDetailModel.find({orderNumber:requestedId})
    res.send(findingData)
  }
catch(error){
  console.log(error.message)
}

}
const getSingleDeliverDetail=async(req,res)=>{
  console.log(req.params.id)
  
  getQueryFromDatabase(deliveryDetailModel,req.params.id,res,200)
}
module.exports = { getCompany, getcompanyNames,removeProducts,getDeliveryDetail, getCompanyBuyers ,getProducts,getOrders,getSingleOrder,getSingleDeliverDetail};