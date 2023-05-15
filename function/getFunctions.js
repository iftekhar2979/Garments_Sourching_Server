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
    const companyNames = findingData.map(companyName => companyName.companyName)
    return res.status(200).send(companyNames)
  } catch (error) {

    return res.status(404).send({ error: error.message })
  }

}


const getCompanyBuyers = async (req, res) => {
  try {
    const query = req.query?.companyBuyers

    const findingData = await companyModel.findOne({ companyName: query })
    // console.log([...findingData])
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
  getFromDatabase(orderListModel, res, 200)
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