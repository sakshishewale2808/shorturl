import { Schema,model } from "mongoose";
const userSchema = new Schema({
   Name:{
    type:String,
    required:true
   },
   Email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   dob:{
    type:String,
    required:true,
   }
},{
    timestamps:true
})

const User = new model("user",userSchema)
export default User
