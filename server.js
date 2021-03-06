'use strict';

var port = 1333,
express = require('express'),
app = express().use(express.static(__dirname + '/')),
 https = require('https').Server(app),
io = require('socket.io')(https);



app.use('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.use(function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

https.listen(port, function(){
    console.log("Node server listening on port " + port);
});



var HolidayAPI = function (key) {

  if ('undefined' !== typeof key) {

    HolidayAPI.prototype.key = key;

  }

};



HolidayAPI.prototype.v1 = {};



HolidayAPI.prototype.v1.holidays = function (parameters, callback) {

  var url = 'https://holidayapi.com/v1/holidays';

  var querystring = '?key=' + HolidayAPI.prototype.key;



  if ('object' === typeof parameters) {

    for (var parameter in parameters) {

      querystring += '&' + parameter + '=' + parameters[parameter];

    }

  }



  url += querystring;



  https.get(url, function (res) {

    res.on('data', function (data) {

      try {

        data = JSON.parse(data);

      } catch (e) {

        data = {};

      }



      var error = null;



      if (res.statusCode !== 200) {

        if ('undefined' === typeof data['error']) {

          error = 'Unknown error.';

        } else {

          error = data.error;

        }

      }



      return callback(error, data);

    });

  }).on('error', function (e) {

    callback(e.message);

  });

};



module.exports = HolidayAPI;