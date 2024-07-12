const express = require('express');
const router = express.Router();

//only comes here when it fails to get the city name in the weather.js route
router.get('/api/weather/', (_,res) => {
    res.send("Please enter the City Name after the /weather/ part in the URL to get weather information.")
});

//All other requests enter here.
router.get('*', (_,res) => {
    res.send("Nothing here. Please use the appropriate route: /api/weather/'City_Name' to get weather information.")
});

module.exports = router;