// const anchors=document.querySelectorAll(".anchors");

// for(var i=0;i<anchors.length;i++){
//     anchors[i].addEventListener("click",()=>{
//         this.style.display="none";
//     })
// }
console.log("testing");
const searchForm=document.querySelector("form");
const searchBox=document.querySelector("input");
const locationmain=document.querySelector("#location");
const weather=document.querySelector("#weatherOverall");
const weatherTemperature=document.querySelector("#weatherTemperature");
const weatherFeelsLike=document.querySelector("#weatherFeelsLike");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const address=searchBox.value;
    console.log(address);
    locationmain.textContent="loading....";
    weather.textContent="";
    weatherTemperature.textContent="";
    weatherFeelsLike.textContent="";

    const url="http://localhost:8080/weather?address="+address;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
           if(data.error)
           {
            locationmain.textContent=  data.error;
        }else{
               locationmain.textContent=data.location;
               weather.textContent=data.overallForecast;
               weatherTemperature.textContent=data.temperature;
               weatherFeelsLike.textContent=data.feelsLikeTemperature;               
           }
        })
    })
});