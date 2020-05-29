const request=require("request");

const weatherforecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=6fdd17b05e2a4db2303f619d8c4c79c7&query='+latitude+','+longitude;
    request({url,json:true},(error,{body}={})=>{
    if(error){
        callback("unable to connect to the seerver",undefined)
    } else  if(body.error){
        callback("Unable to fetch the forecast. Try fetching other forecast",undefined);
    }
    else{
     callback(undefined,{overallForecast:body.current.weather_descriptions[0],
                         temperature:body.current.temperature,
                         feelsLikeTemperature:body.current.feelslike
                        });
    }
});
}

module.exports=weatherforecast;