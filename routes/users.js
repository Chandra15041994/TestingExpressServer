import express from 'express'
import userSchema from '../model/schema'
let router = express.Router();

router.post('/', (req, res)=>{
   
   let objUser = new userSchema({    
       Name:req.body.Name,
       EmpId:req.body.EmpId,
       Address:req.body.Address,
   });

   objUser.save((error, data)=>{
     //  if(error){ res.send(error)}
       //	else{
       	 res.send(data)
       	//}
   })  

});

export default router;