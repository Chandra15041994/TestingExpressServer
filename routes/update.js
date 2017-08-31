import express from 'express'
import userSchema from '../model/schema'
let router = express.Router();

router.put('/:Name', (req, res)=>{
     userSchema.update({Name:req.params.Name}, {$set: {Address:req.body.Address}}, (err, data)=>{
    // if(err){ 
     	//res.send(err)
     //}
     	//else
     	//{
     		res.json(data);
     	//}     	
   });
 });

export default router;