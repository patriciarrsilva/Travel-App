const dotenv = require('dotenv');
dotenv.config();
// geonames_username: process.env.GEONAMES_USERNAME
// weatherbit_key: process.env.WEATHERBIT_API_KEY
// pixabay_key: process.env.PIXABAY_API_KEY
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');

var json = {
  title: 'test json response',
  message: 'this is a message',
  time: 'now',
};

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static('dist'));

console.log(JSON.stringify(mockAPIResponse));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.get('/test', function (req, res) {
  res.json(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// POST base
app.post('/base', function (req, res) {
  projectData = {};
  projectData.location = req.body.location;
  projectData.dateValue = req.body.dateValue;
  projectData.daysLeft = req.body.daysLeft;

  res.send({
    location: projectData.location,
    dateValue: projectData.dateValue,
    daysLeft: projectData.daysLeft,
  });
});

// POST weatherbit
app.post('/weatherbit', function (req, res) {
  projectData.temperature = req.body.temperature;
  projectData.description = req.body.description;

  res.send({
    temperature: projectData.temperature,
    description: projectData.description,
  });
});

// POST pixabay
app.post('/pixabay', function (req, res) {
  projectData.imgSrc = req.body.imgSrc;

  res.send({ imgSrc: projectData.imgSrc });
});

// GET all
app.get('/all', (req, res) => {
  res.send(projectData);
});
