require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.use(express.static(__dirname + '/../dist'));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../dist/index.html'));
});

app.listen(port, () => { 
  console.log(`Listening on port ${port}`)
});