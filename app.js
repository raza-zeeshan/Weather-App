const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "98a8bfc77b0da77c84fc08ba18b69461"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

    https.get(url, function (response) {
        // console.log("status code : " + response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            //    console.log(weatherData);
            const temp = weatherData.main.temp;
            // console.log("temperature : " + temp);
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p> the weather is currently " + weatherDescription + " </p>");
            res.write("<h1>temperature in "+query+" is " + temp + "degree celcius.</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
            // const object = {
            //     name: "Zeeshan raza",
            //     favouriteFood: "meat"
            // }
            // console.log(JSON.stringify(object));
        });
    });
});
app.listen(4040, function () {
    console.log("server running at port 4040");
});



