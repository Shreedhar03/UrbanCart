const express = require('express');
const mongoose = require("mongoose");
const Model = require('./Database/Models/productSchema');
const userData = require('./Database/Models/users')
const cors = require('cors')
const router = require('./Routes/routes')
const app = express();
const port = 5000;

app.use(express.json())
app.use(cors())
app.use(router)

mongoose.connect("mongodb+srv://Shreedhar03:mongodb%402408@urbancart.rei59r5.mongodb.net/UrbanCart?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connected to MongoDB Atlas")
        app.listen(port,()=>{
            console.log("Server is live on port" , port)
        })
    }).catch(err=>{
        console.log(err)
    })

app.get('/', async (req,res)=>{
    console.log("home");
    // await userData.deleteMany({});
    res.send("hello")
})



// initialData();