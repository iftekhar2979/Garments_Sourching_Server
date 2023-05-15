async function getQueryFromDatabase(collection,query,res,statusCode){
    try {

      const findingData= await collection.findById(query)
       return res.status(statusCode).send(findingData);
     } catch (error) {
       if(error) statusCode=404
       console.log(error)
       return res.status(statusCode).send({ error: error.message });
     }
  }
  module.exports=getQueryFromDatabase