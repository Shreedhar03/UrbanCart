const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Shreedhar03:mongodb%402408@urbancart.rei59r5.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connected to MongoDB Atlas")
    }).catch(err=>{
        console.log(err)
    })