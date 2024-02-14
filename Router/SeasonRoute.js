const express = require('express');
const orderListModel = require('../Schema_model/OrderListSchema');
const router = express.Router();
// const {findingSeasons}=require("../controller/seasonController")


router.post('/season/:id',async(req,res)=>{
    const expectedSeason=req.params.id
    try{
        const aggregationPipeLine=[
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  season: expectedSeason,
                },
            },
            {
              $group:
                /**
                 * _id: The id of the group.
                 * fieldN: The first field name.
                 */
                {
                  _id: {
                    productName: "$productName",
                    companyName: "$companyName",
                    buyerName: "$buyerName",
                  },
                  orderQuantity: {
                    $sum: "$grandTotalQuantity",
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
                  product: "$_id.productName",
                  company: "$_id.companyName",
                  buyer:"$_id.buyerName",
                  orderQuantity: "$orderQuantity",
                },
            },
          ]
    
          const findingTheSeasonValue= await orderListModel.aggregate(aggregationPipeLine)
          res.send(findingTheSeasonValue)
    }catch(error){
        res.status(400).send({error:"Server Side Problem"})
    }
})
module.exports=router

