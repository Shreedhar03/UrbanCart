const express = require('express');
const mongoose = require("mongoose");
require("./Database/connection")
const Model = require('./Database/Models/productSchema');
const initialData = require('./Database/initialData')
const cors = require('cors')

const app = express();
const port = 3000;


app.use(express.json())
app.use(cors())
const router = require('./Routes/routes')
app.use(router)

app.get('/',(req,res)=>{
    const data = req.body;
    
})
app.listen(port,()=>{
    console.log("Server is live on port" , port)
})

initialData();