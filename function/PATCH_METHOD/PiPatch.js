const piModel = require("../../Schema_model/PiSchema")

const piNamePatch = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body.piNumber
     
         await piModel.findByIdAndUpdate(id, { piNumber: body })
        return res.status(200).send({updated:true})
    } catch (error) {
        return res.status(400).send({updated:false})
    }
}
module.exports = { piNamePatch }