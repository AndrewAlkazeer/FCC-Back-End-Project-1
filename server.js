// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/timestamp/:dateVal', function(req, res, next){
  var dateVal = req.params.dateVal;
  
  var dateFormattingOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'    
  };
  
  if(isNaN(dateVal)){
      var naturalDate = new Date(dateVal);
      naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
      var unixDate = new Date(dateVal).getTime()/1000;
  } else{
      var unixDate = dateVal;
      var naturalDate = new Date(dateVal *1000);
      naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
  }
  
  res.json({unix: unixDate, natural: naturalDate});
  });


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});