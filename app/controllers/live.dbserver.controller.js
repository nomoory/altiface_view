// Invoke 'strict' JavaScript mode
'use strict';
var http = requirt('http');
var dbserverInfo = require('../../config/dbserver.info');

// require data to db server
exports.request = function (req, res) {

  // var data = querystring.stringify({
  //   username: "myname",
  //   password: " pass"
  // });

  var options = {
    host: dbserverInfo.host,
    port: dbserverInfo.port,
    path: '/altiface/reports/ranking/live',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Length': Buffer.byteLength(data)
    }
  };

  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log("body: " + chunk);
    });
    response.on('end', function() {
      res.send('ok');
    })
  });
  httpreq.write(data);
  httpreq.end();
};
