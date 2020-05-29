const request=require("request");
const geocode=(address,callback)=>{
    if(address=="") callback("unable to get to location",undefined);
    else{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidHJpc2hhbmt1c2FybWExNjUiLCJhIjoiY2s5NXRlM2U3MDg3NTNtb2xyb3BtYjJjbSJ9.OfhVNYBasBLLtPfNOgmdhQ&limit=1';

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("unable to connect to the server",undefined);
        } else  if(body.features.length===0){
            callback("Unable to fetch the location. Try fetching other forecast",undefined);
        }
        else
        callback(undefined,{
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
       });
    }
}

module.exports=geocode;