const mongoose = require('mongoose')
const Model = require('./Models/users')

const addUser = async()=>{
    try{
        await Model.insertMany([{
            username: "Shreedhar",
            password: "admin@1234"
        }])
    }catch(err){
        console.log(err);
    }
}

module.exports = addUser;