const express = require('express');
const mongoose = require("mongoose");
const Model = require('./Database/Models/productSchema');
const userData = require('./Database/Models/users');
const cors = require('cors');
require('dotenv').config();
const router = require('./Routes/routes')
const app = express();
const path=require('path')

app.use(express.json())
app.use(cors())
app.use(router)

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to MongoDB Atlas")
        app.listen(process.env.PORT,()=>{
            console.log("Server is live on port" , process.env.PORT)
        })
    }).catch(err=>{
        console.log(err)
    })


app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// initialData();