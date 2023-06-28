const express = require('express')
const router = new express.Router(); 
const product = require('../Database/Models/productSchema')

router.get('/category/:id' , async (req,res)=>{
    let id = req.params.id;
    // res.json({"hello":true})
    try{
        // const data = await product.find({category:id});
        // if(data){
        //     res.status(200).json(data)
        // }
        // else{
            //     res.status(400)
            // }
            const data = await product.find({
                category: { $regex: new RegExp(id, 'i') },
            }).exec();
                
            res.status(200).json(data)
            
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({message:"Not found"})
    }
})

router.get('/product/:id', async(req,res)=>{
    let id = req.params.id;

    try{
        const response = await product.findById(id)
        res.json(response);
    }
    catch(err){
        res.json({message:"Not fonud"})
        console.log(err.message);
    }
})
module.exports = router