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

app.get("/api/timestamp/:date?", (req, res) => {
  var dateStr = req.params.date;
  var date;
  var dateRe = /^\d{4}-\d{2}-\d{2}$/;
  var isValid = true;
  
  if (!dateStr) { // empty string
    date = new Date();
  } else if (!isNaN(dateStr)) { // unix timestamp
    date = new Date(parseInt(dateStr));
  } else if (dateRe.test(dateStr)) { // string date
    var dateArgs = dateStr.split("-").map(v => parseInt(v));
    date = new Date(dateArgs[0], dateArgs[1] - 1, dateArgs[2]);
  } else {
    isValid = false;
  }
  
  if (isValid) res.json({unix: date.getTime(), utc: date.toUTCString()});
  else res.json({unix: null, utc: 'Invalid Date'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});