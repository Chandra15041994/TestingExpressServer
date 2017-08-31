import mongoose from 'mongoose'
let Schema = mongoose.Schema;

let dbSchema = new Schema({
   Name : String,
   EmpId : Number,
   Address : String,
});
let data = mongoose.model('data', dbSchema);

export default data;