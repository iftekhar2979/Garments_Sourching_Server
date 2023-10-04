const orderListModel = require("../../Schema_model/OrderListSchema")
const piModel = require("../../Schema_model/PiSchema")

const getUniqueTb = async (req, res) => {
    const companyNames = req.query?.companyName
    const tbNumber=req.query?.tbNumber
   
    try {
        const uniquepiTb = [
            {
                $unwind: "$tbNumbers" // Unwind the tbNumbers array
              },
              {
                $group: {
                  _id: "$piNumber",
                  uniqueTbNumbers:  {  $first: "$tbNumbers" },
                  tbArray: { $push: "$tbNumbers" }
                }
              },
              {
                $project: {
                  _id: 0,
                  piNumber: "$_id",
                  uniqueTbNumbers: 1,
                  tbArray: 1
                }
              }
            
           
          ]
          
          
          
          
          
        let tbLists
        if(tbNumber){
            const withQuery = [
                {
                    $match: {
                        // Add your search criteria here
                        // For example, if you want to filter by companyName:
                        tbNumber:{
                            $regex:tbNumber,
                            $options:'i'
                        }
                    }
                },
                {
                    $match: {
                        tbNumber: { $exists: true }
                    }
                },
                {
                    $lookup: {
                        from: "pi_collections",
                        localField: "tbNumber",
                        foreignField: "tbNumbers",
                        as: "matchedOrders",
                    },
                },
                {
                    $project: {
                        tbNumber: 1,
                        // Include the tbNumber field
                        companyName: 1,
                        // Include the companyName field
                        completed: {
                            $cond: {
                                if: {
                                    $gt: [
                                        {
                                            $size: "$matchedOrders",
                                        },
                                        0,
                                    ],
                                },
                                then: true,
                                else: false,
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$tbNumber",
                        companyName: {
                            $first: "$companyName",
                        },
                        completed: {
                            $first: "$completed",
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        tbNumber: "$_id",
                        // Rename _id to tbNumber
                        companyName: 1,
                        // Keep companyName as is
                        completed: 1,
                    },
                }, {
                    $sort: {
                        tbNumber: 1,
                        companyName: 1,// Sort in ascending order based on tbNumber
                    }
                }
            ]
            tbLists = await orderListModel.aggregate(withQuery)

        }
        if (companyNames) {
            const withQuery = [
                {
                    $match: {
                        // Add your search criteria here
                        // For example, if you want to filter by companyName:
                        companyName: companyNames
                    }
                },
                {
                    $match: {
                        tbNumber: { $exists: true }
                    }
                },
                {
                    $match: {
                      tbNumber: {
                        $exists: true,
                      },
                    },
                  },
                  {
                    $group: {
                      _id: "$tbNumber",
                      companyName: {
                        $first: "$companyName",
                      },
                      completed: {
                        $first: false,
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      tbNumber: "$_id",
                      companyName: 1,
                      completed: 1,
                    },
                  },
                  {
                      $sort: {
                                        companyName: 1,// Sort in ascending order based on tbNumber
                                        tbNumber: 1,
                         }
                                }
            ]

            tbLists = await orderListModel.aggregate(withQuery)
        } 
        
        if(!tbNumber && !companyNames){
            const withComplete = [
                {
                  $match: {
                    tbNumber: {
                      $exists: true,
                    },
                  },
                },
                {
                  $group: {
                    _id: "$tbNumber",
                    companyName: {
                      $first: "$companyName",
                    },
                    completed: {
                      $first: false,
                    },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    tbNumber: "$_id",
                    companyName: 1,
                    completed: 1,
                  },
                },
                {
                    $sort: {
                                      companyName: 1,// Sort in ascending order based on tbNumber
                                      tbNumber: 1,
                       }
                              }
              ]
              
            tbLists = await orderListModel.aggregate(withComplete)
            //console.log(tbLists)
        }
        const piCreated = await piModel.aggregate(uniquepiTb)
       // console.log('picrearte',piCreated)
        // let tbNumberIncludedInPi=piCreated[0].tbNumbers
        // console.log('tb',tbNumberIncludedInPi)
        let tbNumbers
        if (piCreated.length !== 0) {
            tbLists.forEach((item1) => {
                // Iterate through the secondArray
                
                piCreated.forEach((item2) => {
                    
                  if (item1.tbNumber === item2.uniqueTbNumbers) {
                    item1.completed = true;
                    item1.piNumber=item2.piNumber
                    item1.tbArray=item2.tbArray
                    
                  }
                });
              });
        }
console.log(tbLists)
         
        return res.status(200).send(tbLists)
    } catch (error) {
        return res.status(400).send(error)

    }
}

module.exports = { getUniqueTb }