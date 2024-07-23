const express = require('express');
const CityLogs = require('../schemas/cityNameLog');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config(); // for getting env var api_key


// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// route to get weather by city
router.use('/:city',verifyToken ,async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.API_KEY;

    //log the city name with the current time stamp
    const newLog = new CityLogs({City:city.toUpperCase()})
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