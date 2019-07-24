require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// var compression = require('compression');

const app = express();

// app.use(compression());

const port = process.env.port || 3000;

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static(__dirname + '/../dist'));

// create route for location search
  // google places search api request using user location input

// create route for restaurant search
  // google places search api request using restaurant input

// create route for decision being made
  // google maps embed request to display location
  // google places details request  to get specific data for restaurant

app.listen(port, () => { 
  console.log(`Listening on port ${port}`)
});