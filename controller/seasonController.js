const orderListModel = require("../Schema_model/OrderListSchema")

const findingSeasons=async(req,res)=>{
    const expectedSeason=req.params.id
    const aggregationPipeLine=[
        {
          $match:
            {
              season: expectedSeason,
            },
        },
        {
          $group:
            {
              _id: {
                productName: "$productName",
                companyName: "$companyName",
                buyerName: "$buyerName",
                orderQuantity: {
                  $sum: "$totalOrderQuantity",
                },
              },
            },
        },
      ]

      const findingTheSeasonValue= await orderListModel.aggregate(aggregationPipeLine)
      console.log(findingTheSeasonValue)
}
module.exports=(findingSeasons)