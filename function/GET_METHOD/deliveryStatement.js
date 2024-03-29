const deliveryDetailModel = require("../../Schema_model/deliveredOrderSchema")

const getDeliveryStateMent = async (req, res) => {

  const body = req.body

  try {
    const findingValue = await deliveryDetailModel.aggregate([
      {
        $match: {
          tbNumber: { $in: body }
        }
      },
      {
        $group: {
          _id: {
            productName: '$productName',
            chalanNumber: '$chalanNumber',
            createdAt: "$createdAt"
          },
          totalDeliveryQuantity: {
            $sum: '$grandDeliveryQuantity'
          },
          deliveryCount: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            productName: '$_id.productName'
          },
          chalanInfo: {
            $push: {
              chalanNumber: '$_id.chalanNumber',
              deliveryQuantity:
                '$totalDeliveryQuantity',
              createdAt: '$_id.createdAt'
            }
          },
          totalQuantity: {
            $sum: '$totalDeliveryQuantity'
          },
          deliveryCount: { $sum: '$deliveryCount' }
        }
      },
      {
        $project: {
          _id: 0,
          productName: '$_id.productName',
          totalQuantity: 1,
          deliveryCount: 1,
          chalanInfo: 1
        }
      }, 
  

    ],
      { maxTimeMS: 60000, allowDiskUse: true })

    res.status(200).send(findingValue)
  } catch (error) {
    res.status(404).send(error)
  }

}
module.exports = { getDeliveryStateMent }