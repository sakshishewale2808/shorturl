import {Schema,model} from "mongoose";
const Linkschema = new Schema({
title:{
    type:String,
    required:true
},
slug:{
    type:String,
    required:true,
    unique:true
},
target:{
    type:String,
    required:true,
},
views:{
    type:Number,
    default:0
},
user:{
    type:Schema.Types.ObjectId,
    ref:'User'
}
},
{
    timestamps:true
})

const Link = model("Link",Linkschema)
export default Link;