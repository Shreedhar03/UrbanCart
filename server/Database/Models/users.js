const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String,required:false},
    email: {type:String,required:false,unique:true},
    contact: {type:Number,required:false,unique:true},
    password: {type:String,required:false},
    confirmPassword: {type:String,required:false},
    address: {type:String,required:false},
})

const userModel = mongoose.model("users" , userSchema);

module.exports = userModel;