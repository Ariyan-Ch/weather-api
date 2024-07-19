const express = require('express');
require('dotenv').config(); // for getting env var api_key
const app = express();
const weatherRoutes = require('./routes/weather');
const extraRoutes = require('./routes/extras');

// Middleware to parse JSON requests, don't need it since the get request has no body, only the url, which doesn't need to be parsed.
//app.use(express.json());


// Use the weather routes
app.use('/api/weather', weatherRoutes);


//handles all other routes
app.use('/',extraRoutes);


const PORT = 3000;
//opens the port for listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
