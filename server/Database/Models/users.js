const mongoose = require('mongoose');

const productSchema = {
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
}

// Cart schema
const cartSchema = new mongoose.Schema({
  product: { type: productSchema, required: false },
  quantity: { type: Number, required: false, max:5 },
});

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: false },
  contact: { type: Number, required: false },
  password: { type: String, required: false },
  address: { type: String, required: false },
  role: { type: String, required: true, default: "customer" },
  cart: { type:[cartSchema], required: false },
  order: { type:[], completed:Boolean },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
