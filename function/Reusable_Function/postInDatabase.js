const moment=require('moment')
async function postInDatabase(collection, postObject, res, statusCode) {
    try {
      const currentDate=moment().format('ll');
      const postingData = new collection({ ...postObject,createdAt:currentDate });
      const savePostingData = await postingData.save();
      return res.status(statusCode).send(savePostingData);
    } catch (error) {
      if(error.code===11000){
        return res.send({error:'you have already added this Company'})
      }
      if (error) statusCode = 404;
      console.log(error);
      return res.status(statusCode).send({ error: error.message });
    }
  } 
  module.exports =postInDatabase