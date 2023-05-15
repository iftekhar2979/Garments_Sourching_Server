
const companyModel = require("../Schema_model/CompanySchema");
const postInDatabase = require('./Reusable_Function/postInDatabase');
const orderListModel = require('../Schema_model/OrderListSchema');
const deliveryDetailModel = require("../Schema_model/deliveredOrderSchema");
const detailsSizesAndDeliverySizes = require("./Reusable_Function/InputSizeAndDeliverySizeReducer");
const moment=require('moment')
const addCompany = async (req, res) => {
  const body = req.body.obj
  postInDatabase(companyModel, body, res, 200)

}
const addOrder = async (req, res) => {
  const body = req.body
  // console.log(body)
  postInDatabase(orderListModel, body, res, 201)
}
const deliveryDetail = async (req, res) => {
  const body = req.body.obj
  const { details } = body
  const count=await deliveryDetailModel?.estimatedDocumentCount()

  detailsSizesAndDeliverySizes('deliverySize', details)
  detailsSizesAndDeliverySizes('size', details)
  detailsSizesAndDeliverySizes('restSize', details)
  if(count){
    try {
      const currentDate=moment().format('ll');
      const postingData = new deliveryDetailModel({ ...body,createdAt:currentDate,chalanNumber:count+1 });
      const savePostingData = await postingData.save();
      return res.status(202).send(savePostingData);
    } catch (error) {
      if(error.code===11000){
        return res.send({error:'you have already added this Challan'})
      }
      if (error) statusCode = 404;
      console.log(error);
      return res.status(statusCode).send({ error: error.message });
    }
  }

}
module.exports = { addCompany, addOrder, deliveryDetail }