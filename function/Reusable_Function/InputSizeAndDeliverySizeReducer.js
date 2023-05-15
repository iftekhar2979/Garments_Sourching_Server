  const detailsSizesAndDeliverySizes = (input,details) => {
    const deliverySizes=details?.forEach(item=>{
       const size=item[input]
       const finalObj={}
       if(size){
          const keys=Object.keys(size)
          const obj=keys?.map(ita=>{
             if(size[ita]){
              return {[ita]:size[ita]}
             }
          })

          for(let i = 0; i < obj.length; i++ ) {
             Object.assign(finalObj, obj[i]);
           
           }
           item[input]=finalObj

       }
    })
    return deliverySizes
 }
module.exports=detailsSizesAndDeliverySizes