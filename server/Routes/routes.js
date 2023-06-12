const express = require('express')
const router = new express.Router(); 
const product = require('../Database/Models/productSchema')

router.get('/products' , async(req,res)=>{
    try{
        const data = await product.find();
        // console.log("Database = " , data);
        res.json(data)
    }
    catch(err){
        console.log(err.message)
    }
})

module.exports = router