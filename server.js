const express = require('express');
const axios = require("axios");

const app = express();

app.use(express.static('public'));
app.set("view engine",'ejs');

if(process.env.NODE_ENV != "production")
    require("dotenv").config();

async function wheather(url){
    try{
        const response = await axios.get(url);
        const data = {location:response.data.location.name,...response.data.current.condition,wind:response.data.current.wind_mph,
                      temp:response.data.current.temp_c ,humidity : response.data.current.humidity};

        const error = null;

        return {data,error};
        
    }catch(e){
        const data = null;
        const error = e.response.data.error.message;

        return {data,error};

    }  
}

app.get('/',(req,res)=>{
    res.render('main',{data:null,error:null});
})

app.get('/weather',async(req,res)=>{
    
    const city = req.query.city;
    const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}&aqi=no`

    const {data,error} = await wheather(url);

    res.render('main',{data,error});
})

const port = process.env.PORT || 3000;

app.listen(port , ()=>console.log(`connected to port ${port}`))