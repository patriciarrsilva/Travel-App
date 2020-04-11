var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

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

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.get('/test', function (req, res) {
  res.json(mockAPIResponse);
});

const port = 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
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
