const express = require('express');

const mongoose = require('mongoose');
const CityLogs = require('../schemas/cityNameLog.js')

const axios = require('axios');
const router = express.Router();
require('dotenv').config(); // for getting env var api_key

//connecting with the remote atlas
const DB = process.env.DB_CONN.replace('<PASSWORD>', process.env.DB_PASS);
mongoose.connect(DB).then( () => {
    console.log("Connection with Atlas Established Successfully!");
}).catch(() =>{
    console.log("Error Encountered at connecting with mongoose!");
});

// route to get weather by city
router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.API_KEY;

    //log the city name with the current time stamp
    const newLog = new CityLogs({City:city})
    newLog.save().then( () => {
        console.log("Logged the City Name");
    }).catch((err) => {
        console.log("Error while Logging the city name:", err );
    })

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = response.data
        const weatherInfo = `
            <html>
            <head>
                <title>Weather Info for ${data.name}</title>
            </head>
            <body>
                <h1>Weather Information for ${data.name}</h1>
                <p><strong>Weather:</strong> ${data.weather[0].main}</p>
                <p><strong>Description:</strong> ${data.weather[0].description}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} Celsius</p>
                <p><strong>Feels Like:</strong> ${data.main.feels_like} Celsius</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Peak Temperature:</strong> ${data.main.temp_max} Celsius</p>
                <p><strong>Clouds:</strong> ${data.clouds.all}%</p>
            </body>
            </html>
        `;
        //prints the formatted weather data.
        res.send(weatherInfo);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;