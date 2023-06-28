const express = require('express')
const router = new express.Router(); 
const product = require('../Database/Models/productSchema')

router.get('/category/:id' , async (req,res)=>{
    let id = req.params.id;
    // res.json({"hello":true})
    try{
        const data = await product.find({category:id});
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(400)
        }
    }
    catch(err){
        console.log(err.message)
    }
})

module.exports = router