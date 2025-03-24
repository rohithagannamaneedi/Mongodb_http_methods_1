const express = require("express");

const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.get("/",(req,res)=>{
    return res.send({message:"This is learn backend"});
})


const router = require("./router");

app.use("/product",router);


app.listen(8080,async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to server successfully")
    } catch (error) {
        console.log(error)
    }
})