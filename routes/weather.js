const express = require('express');
const axios = require('axios');
const router = express.Router();

// Example route to get weather by city
router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = '1320dcf4cbb35478c2564cbc6edbb7de'; // Replace with your weather API key

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;