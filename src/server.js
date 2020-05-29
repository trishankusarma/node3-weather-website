const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const geocode=require('../utility/geocode.js');
const weatherforecast=require('../utility/weatherforecast.js');

const port=process.env.PORT||8080;
//middlewares
app.use(express.urlencoded({extended:false}));

//defining paths for express configuration 
app.use(express.static(path.join(__dirname,"/public")));
const viewsDirectory=path.join(__dirname,"/templates/views");
const partialDirectory=path.join(__dirname,"/templates/partials");

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set("views",viewsDirectory);
hbs.registerPartials(partialDirectory);

//set up dynamic directory to server
app.get("/",(req,res)=>{
    res.render("index",{
        title:"Weather",
        body:"Fetching weather data been made easy!Just enter the location and get your forecast",
        name:"Trishanku Sarma"
    });
})


//set up static directory to serve
app.get("/weather",(req,res)=>{
    const address=req.query.address;

if(!address) return res.send({
    error:"No Adress been added to fetch",
}) 

geocode(address,(error,{latitude,longitude,location}={})=>{
    if(error){ 
        return res.send({
            error:error,
        })
    }
    else{
        weatherforecast(latitude,longitude,(error,{overallForecast,temperature,feelsLikeTemperature}={})=>{
        if(error){
            console.log(error);
        }else{
            res.send({
                location,
                overallForecast,
                temperature,
                feelsLikeTemperature
            })
        }
        });
    }
});
})
//we simply need to render what we wanna want to perceive through a site using just through --
//templates where we describe what need to be enrolled by other sites as per requirement 
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        body:"This includes our foremost forecast team-Its objective -Its views",
        name:"Trishanku Sarma",
    });
})
app.get("/help",(req,res)=>{
    res.render("help",{
    title:"Help",
    body:"Any Help  from our side can contact us . Contact No:8486241192 ",
    name:"Trishanku Sarma",
    });
});
app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404-error",
        body:"Content for the article on 'Help' you are trying to fetch is currently unavailable",
        name:"Trishanku Sarma",
    }) 
})
app.get("/about/*",(req,res)=>{
    res.render("404",{
        title:"404-error",
        body:"Content for the article on 'About us' you are trying to fetch is currently unavailable",
        name:"Trishanku Sarma",
    }) 
})
app.get("*",(req,res)=>{
    res.render("404",{
        title:"404-error",
        body:"You are trying to fetch a page which is currently unavailable",
        name:"Trishanku Sarma",
    })
})

app.listen(port,()=>{
    console.log("server running on port "+port);
});