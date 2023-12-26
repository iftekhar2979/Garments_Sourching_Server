const piModel = require("../../Schema_model/PiSchema")
const { deleteFromDatabase, deleteQueryFromDatabase } = require("../Reusable_Function/DeleteFromDatabase")

const deletePi = async (req, res) => {
    const query=req.query.id
   
    deleteQueryFromDatabase(piModel,query,res,202)
}
module.exports={deletePi}