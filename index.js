// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// when empty request
app.get("/api/", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString()
  });
});

// when there is date
app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  let newDate = new Date(date);
  let validation = new Date(parseInt(date));
  const dateJson = newDate.toJSON();

  if(/^\d{1,4}\-.*/.test(date)) {
    res.json({
      unix: Date.parse(date),
      utc: new Date(dateJson).toUTCString()
    });
  }
  else {
    if(validation.toString() === "Invalid Date") {
      res.json({
        error: "Invalid Date"
      });
    }
    else {
     res.json({
        unix: validation.valueOf(),
        utc: validation.toUTCString()
      }); 
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});