require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.port || 3000;

app.use(express.static(__dirname + '/../dist'));

app.get('/location', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.searchedLoc}&key=${process.env.GOOGLE_API_KEY}`)
  .then((data) => {
    let lat = JSON.stringify(data.data.results[0].geometry.location.lat);
    let lng= JSON.stringify(data.data.results[0].geometry.location.lng);
    res.send(lat + ',' + lng);
  })
  .catch(() => {

  })
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../dist/index.html'));
});

app.listen(port, () => { 
  console.log(`Listening on port ${port}`)
});

