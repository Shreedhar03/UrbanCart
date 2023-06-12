const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    rating:Number,
    price:Number,
    category:String,
    brand:String,
    images:Object,
},{timestamps: false})

const Model = new mongoose.model("UrbanCart" , productSchema)

module.exports = Model;