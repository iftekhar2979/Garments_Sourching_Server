const orderListModel = require("../Schema_model/OrderListSchema")

const getProductSummary=async(req,res)=>{

    try{
        const updated=[
            {
              $group:
                /**
                 * _id: The id of the group.
                 * fieldN: The first field name.
                 */
                {
                  _id: {
                    productName: "$productName",
                  },
                  totalQuantity: {
                    $sum: "$grandTotalQuantity",
                  },
                  restQuantity: {
                    $sum: "$grandRestQuantity",
                  },
                  orderCount: {
                    $sum: 1,
                  },
                },
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                  _id: 0,
                  product_Name: "$_id.productName",
                  total_Ordered_Quantity: "$totalQuantity",
                  total_Rest_Quantity: "$restQuantity",
                  Order_Count: "$orderCount",
                },
            },
          ]
        const result = await orderListModel.aggregate(updated)
        res.status(200).send(result)

    }catch(error){
        res.status(404).send({error:'Server Side Error'})

    }
}
module.exports={getProductSummary}