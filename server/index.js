const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
var compression = require('compression');

const app = express();

app.use(compression());

const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../dist'));

app.listen(port, () => { 
  console.log(`Listening on port ${port}`)
});