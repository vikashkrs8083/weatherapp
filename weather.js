const express = require('express')
const bodyParser = require('body-parser')
const https = require('node:https');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/",function (request,response) {

response.sendFile(__dirname+"/index.html")
});

app.post("/",function(request,response){
  var city=request.body.city;
  var appid="e624cc364e2d0b495cceba4ae9f00559";
  var units="metric"
  url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+units;

  https.get(url, function(res)
  {
    res.on("data", (data) => {
      var weatherData=JSON.parse(data);
      if(weatherData.cod=='200'){
      var icon= "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
      response.write("<h1>City : "+weatherData.name+"</h1>\n");
      response.write("<h1>Description : "+weatherData.weather[0].description+"</h1>\n");
      response.write("<h1>Temperature in "+city+" : "+weatherData.main.temp+ "<sup>o</sup> celsius</h1>\n");
      response.write("<img src="+icon+">");
      response.send();
  }
  else {
    response.send("<h1>Invalid url </h1>");
  }
      });
  });

});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
