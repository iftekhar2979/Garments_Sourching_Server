const { type } = require('express/lib/response');
const moment=require('moment')
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
      console.log(error)
      if (error) statusCode = 404;

      const errorArray=error.message
      
      const propertyArray=['companyName',"range",'tbNumber','orderedDate','productName','orderNumber','location','email','contact']
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