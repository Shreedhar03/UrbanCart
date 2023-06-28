const express = require('express');
const mongoose = require("mongoose");
require("./Database/connection")
const Model = require('./Database/Models/productSchema');
const userData = require('./Database/Models/users')
const cors = require('cors')
const router = require('./Routes/routes')
const app = express();
const port = 5000;

app.use(express.json())
app.use(cors())
app.use(router)

app.get('/', async (req,res)=>{
    console.log("home");
    // await userData.deleteMany({});
    res.send("hello")
})

app.listen(port,()=>{
    console.log("Server is live on port" , port)
})

// initialData();