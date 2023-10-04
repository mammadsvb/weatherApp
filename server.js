const express = require('express');
const axios = require("axios");

const app = express();

app.use(express.static('public'));
app.set("view engine",'ejs');

if(process.env.NODE_ENV != "production")
    require("dotenv").config();

let location = "london";
const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}&aqi=no`

async function wheather(url){
    try{
        const response = await axios.get(url);
        console.log(response.data)
        const data = {location:{name:response.data.location.name,country:response.data.location.name}}

    }catch(e){
        console.error(e.response.data)
    }  
}

wheather(url);



app.get('/',(req,res)=>{
    res.render('main');
})

const port = process.env.PORT || 3000;

app.listen(port , ()=>console.log(`connected to port ${port}`))