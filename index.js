const express = require('express');
require('dotenv').config(); // for getting env var api_key
const app = express();
const weatherRoutes = require('./routes/weather');
const extraRoutes = require('./routes/extras');
const signupRoutes = require('./routes/signup.js');
const signinRoutes = require('./routes/signin');
const mongoose = require('mongoose');


//connecting with the remote atlas
//const DB = process.endv.DB_CONN.replace('<PASSWORD>', process.env.DB_PASS);
mongoose.connect(process.env.DB_LOCAL).then( () => {
    console.log("Connection with Database Established Successfully!");
}).catch(() =>{
    console.log("Error Encountered at connecting with Database!");
});

// Middleware to parse JSON requests, don't need it since the get request has no body, only the url, which doesn't need to be parsed.
app.use(express.json());

//post request to signup page
app.post('/signup', signupRoutes);

//post request to signin page
app.post('/signin', signinRoutes);

// Use the weather routes
app.use('/api/weather', weatherRoutes);


//handles all other routes
app.use('/',extraRoutes);


const PORT = 3000;
//opens the port for listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
