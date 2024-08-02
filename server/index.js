import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Link from "./models/Link.js";

const app = express()
app.use(express.json())
app.use(cors())


const portnumber = process.env.PORT
//connect backend

const ConnectDb = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    if(conn){
        console.log("mongodb connected successfully");
    }
    else{
        console.log("mongodb not connectd");
    }
}
ConnectDb();

app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"hello all"
        
    })
})
app.post ("/link",async(req,res)=>{
    const {title,slug,target}=req.body
    const linkurl  =  new Link({
        title,
        slug,
        target
    })
    const savedlink = await linkurl.save();
    res.json({
        success:true,
        data:savedlink,
        message:"successfully done"
    })

})
app.listen(portnumber,(req,res)=>{
console.log(`code is running at port ${portnumber}`);

})

