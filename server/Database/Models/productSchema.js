const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    rating:Number,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    category:String,
    brand:String,
    images:Array,
},{timestamps: true})


const Model = mongoose.model("initialData" , productSchema)

module.exports = Model;