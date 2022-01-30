const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.listen(5000, ()=>{
  console.log("server has started on 5000")
});


require('./Routes/matchroute')(app);
require('./Routes/playerroutes')(app);
require('./Routes/venueroute')(app);
module.exports = app;