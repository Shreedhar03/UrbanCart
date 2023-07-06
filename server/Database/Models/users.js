const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    username: { type: String, required: false },
    contact: { type: Number, required: false },
    password: { type: String, required: false },
    address: { type: String, required: false },
    role: { type: String, required: true, default: "customer" },
    cart: {
        type: [{
            product_id: String,
            quantity: Number
        }], required: false
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;