const mongoose = require('mongoose')

const productSchema = {
    id: Number,
    title: String,
    description: String,
    rating: Number,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    category: String,
    brand: String,
    images: Array,
}

const cartSchema = new mongoose.Schema({
    product: { type: productSchema, required: false },
    quantity: { type: Number, required: false, max: 5 },
});

// Shipping address schema
const addressSchema={
    title:String,
    fName:String,
    lName:String,
    contact:Number,
    flatNo:String,
    building:String,
    landmark:String,
    area:String,
    city:String,
    state:String,
    pin:Number
  }

let order = new mongoose.Schema({
    userID: String,
    name:String,
    cart: [cartSchema],
    amountPaid:Number,
    shippingAddress:[addressSchema],
    status: { type: String, default: "Pending" },
}, { timestamps: true })

module.exports = mongoose.model("orders", order)