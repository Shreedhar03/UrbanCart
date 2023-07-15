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

let order = new mongoose.Schema({
    userID: String,
    name:String,
    cart: [cartSchema],
    amountPaid:Number,
    status: { type: String, default: "Pending" },
}, { timestamps: true })

module.exports = mongoose.model("orders", order)