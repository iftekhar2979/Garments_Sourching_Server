const { type } = require('express/lib/response');
const moment=require('moment');
const { registerUser } = require('../../controller/userControllers');
async function postInDatabase(collection, postObject, res, statusCode) {
    try {
      const currentDate=new Date();
      const postingData = new collection({ ...postObject,createdAt:currentDate });
      const savePostingData = await postingData.save();
      return res.status(statusCode).send(savePostingData);
    } catch (error) {
      if(error.code===11000){
        return res.send({error:'You have already added that'})
      }
    
      if (error) statusCode = 404;

      const errorArray=error.message
      if(errorArray==="Buyer does not belong to the specified company"){
        return res.status(statusCode).send({ error:errorArray});
      }
      const propertyArray=['companyName',"range",'buyer','tbNumber','orderedDate','productName','orderNumber','location','email','contact']
      let errorMessage=[]
      let count=0
      propertyArray.forEach(item=>{
        if(errorArray.includes(item)){
          // if(item==='companyName'){
          //   item='Company Name'
          // }
          // if(item==='range'){
          //   item='Range'
          // }
          // if(item==='tbNumber'){
          //   item='TB Number'
          // }
          // if(item==='orderedDate'){
          //   item='Order Date'
          // }
          // if(item==='productName'){
          //   item='Product Name'
          // }
          // if(item==='orderNumber'){
          //   item='Order Number'
          // }
          // if(item==='email'){
          //   item='Email Address'
          // }
          // if(item==='contact'){
          //   item='Contact Number'
          // }
          // count=count+1
          
          errorMessage.push(`${item}`)
        }
      })
    
    
      
    
      return res.status(statusCode).send({ error:errorMessage});
    }
  } 
  module.exports =postInDatabase