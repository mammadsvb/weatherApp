const express = require('express');
const axios = require("axios");
const app = express();

app.use(express.static('public'));
app.set("view engine",'ejs');

// if be in dev env can access
if(process.env.NODE_ENV != "production")
    require("dotenv").config();

//func for send req to api and get data
async function wheather(url){
    try{
        const response = await axios.get(url);
        //Extract useful information
        const data = {location:response.data.location.name,...response.data.current.condition,wind:response.data.current.wind_mph,
                      temp:response.data.current.temp_c ,humidity : response.data.current.humidity};

        const error = null;

        return {data,error};
        
    }catch(e){
        const data = null;
        // set error message
        const error = e.response.data.error.message;

        return {data,error};

    }  
}

//render page if don't use path
app.get('/',(req,res)=>{
    res.render('main',{data:null,error:null});
})

//render main page
app.get('/weather',async(req,res)=>{
    //get city from client
    const city = req.query.city;
    //set url for sending to api
    const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}&aqi=no`;

    const {data,error} = await wheather(url);

    res.render('main',{data,error});
})

//determine port
const port = process.env.PORT || 3000;

//establish app
app.listen(port , ()=>console.log(`connected to port ${port}`));