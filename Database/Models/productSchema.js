const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    rating:String,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    category:String,
    brand:String,
    images:Array,
    gender:{type:String,default:"NA"},
    sold:{type:Number,default:0}
},{timestamps: true})


const Model = mongoose.model("initialData" , productSchema)

module.exports = Model;