const { CURSOR_FLAGS, ObjectId } = require("mongodb");
const companyModel = require("../Schema_model/CompanySchema");
const getFromDatabase = require("./Reusable_Function/getFormDatabase");
const getQueryFromDatabase = require("./Reusable_Function/getQueryFromDatabase");
const productModel = require("../Schema_model/ProductSchema");
const orderListModel = require("../Schema_model/OrderListSchema");
const deliveryDetailModel = require("../Schema_model/deliveredOrderSchema");
const { query } = require("express");
const piModel = require("../Schema_model/PiSchema");
const { restart } = require("nodemon");
const { default: mongoose } = require("mongoose");

// get from database function

const getCompany = async (req, res) => {
  getFromDatabase(companyModel, res, 200)
}

const getcompanyNames = async (req, res) => {
  try {
    const findingData = await companyModel.find({})
    const companyNames = findingData.map(item => {
      return {
        companyName: item.companyName,
        location: item.location,
        buyer: item.buyers,
        shortForm: item.shortForm
      }
    })
    console.log(companyNames)

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

const getProducts = async (req, res) => {
  try {
    const requestedId = req.params.id
    const findingData = await productModel.findById(requestedId)
    return res.send(findingData)
  } catch (error) {
    return res.send({ error: error.message })
  }
}
const removeProducts = async (req, res) => {
  try {
    const query = req.query.productName
    const id = req.params.id
    console.log(id, query)
    const findData = await productModel.findByIdAndUpdate(id, { $pull: { products: query } }, {
      new: true,
      upsert: true,
    })
    return res.status(200).send({ isUpdated: true, findData })
  } catch (error) {
    return res.status(200).send({ error: error.message })
  }
}

const getOrders = async (req, res) => {
  const page = parseFloat(req.query.page)
  try {
    const findingData = await orderListModel.find({}, { companyName: 1, buyerName: 1,completeDate:1, tbNumber: 1, range: 1, productName: 1, orderNumber: 1, grandTotalQuantity: 1, grandRestQuantity: 1, orderedDate: 1, targetDate: 1, status: 1, completedDate: 1 }).sort({ createdAt:-1}).limit(15).skip(15 * page)
    const count = await orderListModel?.estimatedDocumentCount()
    return res.status(200).send({ documentCount: count, findingData });
  } catch (error) {
    if (error) statusCode = 404
    console.log(error)
    return res.status(statusCode).send({ error: error.message });
  }

}
const getBuyers = async (req, res) => {
  try {
    const piplineForEveryThing=[
      {
        $unwind: {
          path: "$buyers",
          includeArrayIndex: "String",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: null,
          buyers: {
            $addToSet: "$buyers",
          },
          companyName: {
            $addToSet: "$companyName",
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "productNames",
          as: "productArray",
        },
      },
      {
        $unwind: {
          path: "$productArray",
        },
      },
      {
        $lookup: {
          from: "orderlists",
          localField: "companyName",
          foreignField: "companyName",
          as: "seasonArray",
        },
      },
      {
        $unwind: {
          path: "$seasonArray",
        },
      },
      {
        $group: {
          _id: {
            uniqueBuyers: "$buyers",
            companyName: "$companyName",
            products: "$productArray.products",
          },
          season: {
            $addToSet: "$seasonArray.season",
          },
        },
      },
      {
        $project: {
          _id: 0,
          buyerList: "$_id.uniqueBuyers",
          companyList: "$_id.companyName",
          seasonList: "$season",
          productList: "$_id.products",
        },
      },
    ]
    // const pipeline = [
    //   {
    //     $match: {
    //       buyers: { $ne: [] } // Exclude documents with empty buyers array
    //     }
    //   },
    //   {
    //     $unwind: '$buyers'
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       uniqueBuyers: { $addToSet: '$buyers' }
    //     }
    //   }
    // ];

    const result = await companyModel.aggregate(piplineForEveryThing);
    res.send(result)

    // if (result.length > 0) {
    //   res.json(result[0]);
    // } else {
    //   res.json([]);
    // }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
const getFilterOrders = async (req, res) => {

  const page =parseFloat(req.query?.page)

  const keyofQuery=Object.keys(req.query)
  const ValueOfQuery=Object.values(req.query)
  let findtheQuery={[keyofQuery[0]]:ValueOfQuery[0]}
  // console.log(findtheQuery)

  try {
    const findingData = await orderListModel.find(findtheQuery, { companyName: 1, buyerName: 1,completeDate:1, tbNumber: 1, range: 1, productName: 1, orderNumber: 1, grandTotalQuantity: 1, grandRestQuantity: 1, orderedDate: 1, targetDate: 1, status: 1, completedDate: 1 }).sort({ createdAt: -1 }).limit(15).skip(15 * page)
    // console.log(findingData)
    const count = await orderListModel.countDocuments(findtheQuery)
    return res.status(200).send({ documentCount: count, findingData });
  } catch (error) {
    if (error) statusCode = 404
    console.log(error)
    return res.status(statusCode).send({ error: error.message });
  }

}
const getSearchedOrder = async (req, res) => {
  const orderNumber = req.query.orderNumber;
  const page =parseFloat(req.query?.page)

  const searchTBandOrder={
    $or: [
      {range:{$regex:orderNumber,$options:'i'}},
      { tbNumber: { $regex: orderNumber, $options: 'i' } },
      { orderNumber: { $regex: orderNumber, $options: 'i' } },
    ],
  }

  try {
    const findingData = await orderListModel.find(searchTBandOrder).sort({ createdAt: -1 }).limit(15).skip(15 * page);
    const count = await orderListModel.countDocuments(searchTBandOrder)
  
    return res.status(200).send({ documentCount: count, findingData });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getSingleOrder = async (req, res) => {
  const requestedId = req.params.id

  getQueryFromDatabase(orderListModel, requestedId, res, 200)
}
const getDeliveryDetail = async (req, res) => {
  try {
    const requestedId = req.params.id
    // console.log(requestedId)
    const findingData = await deliveryDetailModel.find({ orderId: requestedId })
    res.send(findingData)
  }
  catch (error) {
    res.send(error)
    console.log(error.message)
  }

}
const getSingleDeliverDetail = async (req, res) => {
 const id=new ObjectId(req.params.id)

 try {
    const findCompanyDetailsAndChalanDetailsTogether=[
  
      {
        $match: {
          _id:id
        }
      },
       {
        $lookup: {
          from: "orderlists",
          localField: "orderNumber",
          foreignField: "orderNumber",
          as: "orderDetails"
        }
      },
      {
        $unwind: "$orderDetails"
      },
      {
        $project: {
          _id: 1,
          companyName: "$orderDetails.companyName",
          companyLocation: "$orderDetails.location",
          productName: "$orderDetails.productName",
          buyerName: "$orderDetails.buyerName",
          location: "$orderDetails.location",
          details: 1,
        grandDeliveryQuantity: 1,
          grandRestQuantity: 1,
          orderId: 1,
          orderNumber: 1,
          createdAt: 1,
          chalanNumber: 1,
          deliveryMan: 1,
          "__v": 1
        }
      }
    ]

    const result = await deliveryDetailModel.aggregate(findCompanyDetailsAndChalanDetailsTogether)
// console.log(result[0])
     return res.status(200).send(result[0]);
   } catch (error) {
     
     return res.status(404).send({ error: error.message });
   }

}
const getFilteredLists = async (req, res) => {
  try {
    const status = req.query
    const findingStatus = await orderListModel.find(status).skip(10).limit(10)
    // log(findingStatus)
  } catch (error) {
    console.log(error)

  }

}


const getPiByRange = async (req, res) => {
  try {
    const { selectedValues } = req.body
    // console.log(selectedValues)
    const result = await orderListModel.aggregate(
      [
        {
          $match: {
            tbNumber: { $in: selectedValues }
          }
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
                shortForm: "$shortForm",
                buyerName: "$buyerName",
                location: "$location",
              },
              totalQuantity: {
                $sum: "$grandTotalQuantity",
              },
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
                productName: "$_id.productName",
                companyName: "$_id.companyName",
                shortForm: "$_id.shortForm",
                buyerName: "$_id.buyerName",
                location: "$_id.location",
              },
              totalQuantity: {
                $sum: "$totalQuantity",
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
              productName: "$_id.productName",
              companyName: "$_id.companyName",
              shortForm: "$_id.shortForm",
              buyerName: "$_id.buyerName",
              location: "$_id.location",
              totalQuantity: 1,
            },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );

    //OLD WITHOUT SHORT FORM
    // const result = await orderListModel.aggregate([
    //   {
    //     $match: { tbNumber: { $in: selectedValues } }
    //   }, {
    //     $group: {
    //       _id: {
    //         productName: '$productName',
    //         companyName: '$companyName',
    //       },
    //       totalQuantity: { $sum: '$grandTotalQuantity' }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$_id.productName",
    //       companyName: { $first: "$_id.companyName" },
    //       totalQuantity: { $sum: "$totalQuantity" }
    //     }
    //   }, {
    //     $project: {
    //       _id: 0,
    //       productName: "$_id",
    //       companyName: 1,
    //       totalQuantity: 1,

    //     }
    //   },
    // ]
    // )
    console.log(result)
    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    return res.status(200).send(error)
  }
}


module.exports = { getCompany, getcompanyNames, getPiByRange, getBuyers, getSearchedOrder, getFilteredLists, removeProducts, getDeliveryDetail, getFilterOrders, getCompanyBuyers, getProducts, getOrders, getSingleOrder, getSingleDeliverDetail };