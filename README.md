# Weather API

### General Info:
#### Used openweathermap's api to show data of a city.
#### Used two routes weather.js and extras.js
#### Used Mongoose to log data and store user creds in database.'
#### Used JWT authentication and used client side cookies to store authentication token to implement sign in and sign up to access data.
### Before running:
#### 1: change api_key variable in weather.js to your api key provided by openweathermap
#### 2: add your connection string to mongoDB in the DB_LOCAL variable
#### 3: add a secret string in the JWT_SECRET variable
### To run:
#### 1: Run the app
#### 2: go to localhost:3000/signup
#### 3: enter user name and password
#### 4: go to localhost:3000/signin and add the same username and password which u signed up with
#### 5: go to localhost:3000/api/weather/< City Name > to get data

#### - going directly to localhost:3000/api/weather/cityName will not work as you will not have been authenticated.
