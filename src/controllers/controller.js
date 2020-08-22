const Weather = require("../model/Weather");

const axios = require("axios");

const API_KEY = "1955f1fb1ee78870e537d08346d833d6";


exports.renderHomePage = (req, res) => {
    res.render("index");
}

exports.getWeather = (req, res) => {
    const city = req.body.city;

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const weather = new Weather(req.body.city);

    weather.validateUserInput();

    if(weather.errors.length)
    {
        res.render("index", {
            error: weather.errors.toString()
        });
    }
    else 
    {
        axios.get(URL)
            .then( (response) => {

             const { temp: temperture } = response.data.main;
             const { name: location } = response.data;

              res.render("index", {
                weather: `The current temperature ${temperture}º in ${location}.`,    
                
              })
          } )
           .catch( (error) => {
            
            if(error)
            {
                res.render("index", {
                    error: "Sorry, city not found. please check the name and try again."
                });
            }

             console.log(error);
          });
    }
    
    
}

exports.renderAboutPage = (req, res) => {
    res.render("about");
}

