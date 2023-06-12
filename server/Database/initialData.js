//storing data in Mongo Atlas

const mongoose = require('mongoose')
const Model = require('./Models/productSchema')
const productData = require('./productData')

const addData = async()=>{
    try{
        await Model.deleteMany({})
        await Model.insertMany(productData)
        // console.log(storeData)
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = addData