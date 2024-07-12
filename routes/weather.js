const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config(); // for getting env var api_key


// Example route to get weather by city
router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.API_KEY;

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