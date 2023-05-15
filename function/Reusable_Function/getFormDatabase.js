async function getFromDatabase(collection, res,statusCode) {
    try {
     const findingData= await collection.find({})
      return res.status(statusCode).send(findingData);
    } catch (error) {
      if(error) statusCode=404
      console.log(error)
      return res.status(statusCode).send({ error: error.message });
    }
  }
 
  module.exports = getFromDatabase
