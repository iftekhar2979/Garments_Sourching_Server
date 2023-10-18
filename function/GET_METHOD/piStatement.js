const piModel = require("../../Schema_model/PiSchema")
const getDataByProperty = require("../Reusable_Function/getDataByProperty")
const getQueryFromDatabase = require("../Reusable_Function/getQueryFromDatabase")

const getPiStatement = async (req, res) => {
    const piNum = req.params.id
    getQueryFromDatabase(piModel,piNum,res,200)
}
const getPiList = async (req, res) => {
    try {
        const findingValue = await piModel.find({}, { companyName:1, piNumber:1, totalQuantity:1, totalAmount:1,_id:1,tbNumbers:1,createdAt:1 })
        res.send(findingValue)
    } catch (error) {
      res.send(error)
    }
}
module.exports = { getPiStatement, getPiList }