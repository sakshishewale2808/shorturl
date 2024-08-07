import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import {postLink,getSlugRedirect,getLinks,getUserLink} from "./controllers/Link.js";
import {postSignup,postLogin} from "./controllers/user.js";

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
app.get("/userlink",getUserLink)
app.post ("/link",postLink)
app.get("/Links",getLinks)
app.get ("/:slug",getSlugRedirect)
app.listen(portnumber,(req,res)=>{
console.log(`code is running at port ${portnumber}`);
})
app.post("/signup",postSignup)
app.post("/login",postLogin)

