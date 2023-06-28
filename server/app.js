const express = require('express');
const mongoose = require("mongoose");
require("./Database/connection")
const Model = require('./Database/Models/productSchema');
// const initialData = require('./Database/initialData')
const userData = require('./Database/userData')
const cors = require('cors')
const router = require('./Routes/routes')
const app = express();
const port = 5000;

app.use(express.json())
app.use(cors())
app.use(router)

app.get('/',(req,res)=>{
    console.log("home");
    res.send("hello")
})

app.listen(port,()=>{
    console.log("Server is live on port" , port)
})

// initialData();
userData();