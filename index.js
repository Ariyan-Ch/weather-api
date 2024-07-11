const express = require('express');
const app = express();
const weatherRoutes = require('./routes/weather');

// Middleware to parse JSON requests
app.use(express.json());

// Use the weather routes
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
