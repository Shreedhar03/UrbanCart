const mongoose = require('mongoose');

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
  pin:Number,
  selected:{type:Boolean,default:null}
}

// Cart schema
const cartSchema = new mongoose.Schema({
  product: { type: productSchema, required: false },
  quantity: { type: Number, required: false, max: 5 },
});

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: false },
  contact: { type: Number, required: false },
  password: { type: String, required: false },
  address: {type:[addressSchema],default:[]},
  role: { type: String, required: true, default: "customer" },
  cart: { type: [cartSchema], required: false },
  message: {
    type: [{ message: String, time: String, category: String, isRead: { type: Boolean, default: false } }],
    createdAt: { type: Date, default: new Date() }
  }
  // order: { type:[], completed:Boolean },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
