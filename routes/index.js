import express from 'express'
import userSchema from '../model/schema'
let router = express.Router();

router.get('/', (req, res)=>{
   userSchema.find({}, (err, data)=>{
        // if(err){ res.send(err) }
         //	else{
         		//console.log(data)
         		res.json(data)
         	//}

   });

});

export default router;