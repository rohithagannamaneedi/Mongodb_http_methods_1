const express = require("express");

const router = express.Router();

const model = require("./schema");

router.post("/post",async(req,res)=>{
    try {
        const {title,price} = req.body;
        if(!title || !price){
            return res.status(401).send({message:"Please provide all details"});
        }

        const newProduct = new model({title,price});
        await newProduct.save();
        return res.status(201).send({message:"Product created sucessfully",newProduct});
    } catch (error) {
        return res.status(500).send({message:"Something went wrong",error});
    }
})

router.put("/put/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        if(!id){
            return res.status(401).send({message:"Please provide id"});
        }

        const {title,price} = req.body;
        if(!title || !price){
            return res.status(401).send({message:"Please provide all details"});
        }

        const update = await model.findOneAndUpdate({_id:id},{title,price});
        return res.status(200).send({message:"Product updated sucessfully",update});

    } catch (error) {
        return res.status(500).send({message:"Something went wrong",error});  
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        if(!id){
            return res.status(401).send({message:"Please provide id"});
        }

        const delete_ = await model.deleteOne({_id:id});
        return res.status(200).send({message:"Product deleted sucessfully",delete_});

    } catch (error) {
        return res.status(500).send({message:"Something went wrong",error});  
    }
})



module.exports = router;