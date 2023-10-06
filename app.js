//const { log } = require("console");
const express =require("express");
const https=require("https");
const bodyparser=require("body-parser")
const app=express();

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apikey="038913f83e90ee2bb7b7d3bb07b7e276";
    const unit ="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
        //console.log(response.statusCode);
        response.on("data",function(data){
            //console.log(data);
            const weatherdata=JSON.parse(data);
            const temp =weatherdata.main.temp;
            const descrip=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            //console.log();
            //console.log(weatherdata);
            res.write("<p>currently weather is "+descrip+"</p>");
            res.write("<h1>the temparature in "+query+" is "+temp+" degrees celsous.</h1>");
            res.write("<img src="+imageurl+">");
            res.send();
        })
    })
})



app.listen(3000,function(){
    console.log("server gone live!");
});






