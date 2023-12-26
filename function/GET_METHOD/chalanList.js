const chalanModel = require("../../Schema_model/ChalanSchema")
const deliveryDetailModel = require("../../Schema_model/deliveredOrderSchema")

const getChalanList = async (req, res) => {
    try {
        //here query of chalan number is also contain 
        const chalanNumber = parseFloat(req.query.chalanNumber)
        const page = parseFloat(req.query.page)
        if (chalanNumber) {
           
            const chalanListAggregation = [
                {
                    $match: {
                        chalanNumber: chalanNumber,
                    }
                },
                {
                    $lookup: 
                    {
                        from: "orderlists",
                        localField: "orderNumber",
                        foreignField: "orderNumber",
                        as: "orderDetails",
                    },
                },
                {
                    $unwind:
                    {
                        path: "$orderDetails",
                    },
                },
                {
                    $project:
                  
                    {
                        companyName: "$orderDetails.companyName",
                        buyerName: "$orderDetails.buyerName",
                        productName: "$orderDetails.productName",
                        totalQuantity: "$orderDetails.grandTotalQuantity",
                        chalanNumber: 1,
                        orderId: 1,
                        orderNumber:1,
                        grandDeliveryQuantity: 1,
                        createdAt: 1,
                    },
                },
                {
                    $sort: {
                        chalanNumber: -1, // Sort by chalanNumber in ascending order
                    },
                },
                {
                    $skip: page * 30,  // Add the $skip stage to skip the first 10 documents
                },
                {
                    $limit: 30,  // Add the $limit stage to limit the result to 5 documents
                }
            ]
            const countDocuments = [
                {
                    $match: {
                        chalanNumber: chalanNumber
                    }
                },
                {
                    $lookup: {
                        from: "orderlists",
                        localField: "orderNumber",
                        foreignField: "orderNumber",
                        as: "orderDetails",
                    },
                },
                {
                    $unwind: {
                        path: "$orderDetails",
                    },
                },
                {
                    $project: {
                        companyName: "$orderDetails.companyName",
                        buyerName: "$orderDetails.buyerName",
                        productName: "$orderDetails.productName",
                        totalQuantity: "$orderDetails.grandTotalQuantity",
                        chalanNumber: 1,
                        orderId: 1,
                        grandDeliveryQuantity: 1,
                        orderNumber:1,
                        createdAt: 1,
                    },
                },
                {
                    $count: "totalDocuments",
                },
            ]
            const result = await deliveryDetailModel.aggregate(chalanListAggregation)
            if(result.length===0){
                return res.status(200).send({error:'No Data Found !!!' })
            }
            const documentCount = await deliveryDetailModel.aggregate(countDocuments)
            return res.status(200).send({ count: documentCount[0].totalDocuments, result })

        } else {
            const chalanListAggregation = [
                {
                    $lookup:
                    /**
                     * from: The target collection.
                     * localField: The local join field.
                     * foreignField: The target join field.
                     * as: The name for the results.
                     * pipeline: Optional pipeline to run on the foreign collection.
                     * let: Optional variables to use in the pipeline field stages.
                     */
                    {
                        from: "orderlists",
                        localField: "orderNumber",
                        foreignField: "orderNumber",
                        as: "orderDetails",
                    },
                },
                {
                    $unwind:
                    /**
                     * path: Path to the array field.
                     * includeArrayIndex: Optional name for index.
                     * preserveNullAndEmptyArrays: Optional
                     *   toggle to unwind null and empty values.
                     */
                    {
                        path: "$orderDetails",
                    },
                },
                {
                    $project:
                    /**
                     * specifications: The fields to
                     *   include or exclude.
                     */
                    {
                        companyName: "$orderDetails.companyName",
                        buyerName: "$orderDetails.buyerName",
                        productName: "$orderDetails.productName",
                        totalQuantity: "$orderDetails.grandTotalQuantity",
                        chalanNumber: 1,
                        orderId: 1,
                        orderNumber:1,
                        grandDeliveryQuantity: 1,
                        createdAt: 1,
                    },
                },
                {
                    $sort: {
                        chalanNumber: -1, // Sort by chalanNumber in ascending order
                    },
                },
                {
                    $skip: page * 30,  // Add the $skip stage to skip the first 10 documents
                },
                {
                    $limit: 30,  // Add the $limit stage to limit the result to 5 documents
                }

            ]
            const countDocuments = [
                {
                    $lookup: {
                        from: "orderlists",
                        localField: "orderNumber",
                        foreignField: "orderNumber",
                        as: "orderDetails",
                    },
                },
                {
                    $unwind: {
                        path: "$orderDetails",
                    },
                },
                {
                    $project: {
                        companyName: "$orderDetails.companyName",
                        buyerName: "$orderDetails.buyerName",
                        productName: "$orderDetails.productName",
                        totalQuantity: "$orderDetails.grandTotalQuantity",
                        chalanNumber: 1,
                        orderId: 1,
                        orderNumber:1,
                        grandDeliveryQuantity: 1,
                        createdAt: 1,
                    },
                },
                {
                    $count: "totalDocuments",
                },
            ]

            const result = await deliveryDetailModel.aggregate(chalanListAggregation)
            const documentCount = await deliveryDetailModel.aggregate(countDocuments)
           

          return  res.status(200).send({ count: documentCount[0].totalDocuments, result })
        }

    } catch (error) {
       
        res.status(404).send(error)
    }
}
module.exports = { getChalanList }