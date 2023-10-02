const express = require('express');
const axios = require("axios");

const app = express();

app.use(express.static('public'));
app.set("view engine",'ejs');

if(process.env.NODE_ENV != "production")
    require("dotenv").config();

app.get('/',(req,res)=>{
    res.render('main');
})

const port = process.env.PORT || 3000;

app.listen(port , ()=>console.log(`connected to port ${port}`))