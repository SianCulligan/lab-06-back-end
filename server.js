'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Home Page');
})

//route definitions app.get

function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}


app.get('/location', (request, response) => {
  try{
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    console.log(request.query);
    const locationData = new Location(city, geoData);
    response.send(locationData);
  }
  catch(error){
    errorHandler('Not today, satan.', request, response);
  }
})






app.get('/weather', (request, response) => {
  try{
    const skyData = require('./data/darksky.json');
    const city = request.query.data.city;

    console.log('lat', request.query.data);
    const weatherData = new Weather(city, skyData);
    response.send(weatherData);
  }
  catch(error){
    errorHandler('Not today, satan.', request, response);
  }
})

function Weather (city, skyData){
  this.lat = skyData[0].latitude;
  this.lon = skyData[0].longitude;
  this.search_query = city;
  this.forecast = skyData[0].summary;
  this.time = skyData[0].time;
}



















app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
