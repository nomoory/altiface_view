// Invoke 'strict' JavaScript mode
'use strict';
var http = require('http');
var path = require('path');
var dbserverInfo = require('../../config/dbserver.info');

// require data to db server
exports.request = function (req, res) {
  // Against AJAX request
//  console.log(req.headers["x-requested-with"]);
  if (req.headers["x-requested-with"] == "XMLHttpRequest") {
    // Send JSON data request to db server

    // Make option information for request to dbserver
    var options = {
      host: dbserverInfo.host,
      port: dbserverInfo.port,
      path: '/altiface/reports/ranking/live?start='+req.query.start+'&size='+req.query.size,
    };

    http.get(options, function (response) {
      response.on('data', function (chunk) {
        console.log("body: " + chunk);
        res.send(chunk);
      });
      response.on('end', function() {
      })
    }).on('error', function (e) {
      console.log("Got error: "+ e.message);
    });
  }

  // Against HTTP request
  else {
    console.log("http request is called");
    res.render('index',{"start":req.query.start,"size":req.query.size});
  }
};
