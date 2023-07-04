const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String,required:false},
    username: {type:String,required:false},
    contact: {type:Number,required:false},
    password: {type:String,required:false},
    address: {type:String,required:false},
})

const userModel = mongoose.model("users" , userSchema);

module.exports = userModel;