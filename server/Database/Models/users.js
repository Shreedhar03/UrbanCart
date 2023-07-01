const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type:String,required:true},
    password: {type:String,required:true},
    confirmPassword: {type:String,required:true},
    firstName: {type:String,required:true},
    lastName: {type:String,required:false},
    address: {type:String,required:true},
})

const User = mongoose.model("users" , userSchema);

module.exports = User;