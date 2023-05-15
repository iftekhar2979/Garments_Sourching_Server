
const orderListModel = require("../Schema_model/OrderListSchema")
const productModel = require("../Schema_model/ProductSchema")
const detailsSizesAndDeliverySizes = require("./Reusable_Function/InputSizeAndDeliverySizeReducer")

const addProducts = async (req, res) => {
   try {
      const requestedId = req.params.id
      const puttingData = await productModel.findByIdAndUpdate(requestedId, { $push: { products: { $each: req.body } } }, {
         new: true,
         upsert: true,
      })

      return res.send({ updated: true, puttingData })
   } catch (error) {
      return res.send({ error: error.message })
   }

}


const editTotalOrderDetails = async (req, res) => {
   try {
      const requestedId = req.params.id
      const body = req.body
      // console.log(body)
      const { details } = req.body
     
      detailsSizesAndDeliverySizes('size',details)
      detailsSizesAndDeliverySizes('restSize',details)

      // functionality
        const puttingOrder=await orderListModel.findByIdAndUpdate(requestedId,req.body,{
         new: true,
         upsert: true,
      })
      return res.send(puttingOrder)
      // console.log(req.body.details)
   } catch (error) {

      return res.send({ error: error.message })
   }
}
module.exports = { addProducts, editTotalOrderDetails }


