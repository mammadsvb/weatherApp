const express = require('express');
const axios = require("axios");

const app = express();

if(process.env.NODE_ENV != "production")
    require("dotenv").config();



const port = process.env.PORT || 3000;

app.listen(port , ()=>console.log(`connected to port ${port}`))