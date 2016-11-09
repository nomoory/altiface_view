// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	express = require('express'),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler'),
  querystring = require('querystring'),
	path = requre('path');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance

  // Use the 'body-parser' middleware
  //app.use(bodyParser.urlencoded({
  //  extended: true
  //}));
  app.use(bodyParser.json());

	// Load the routing files
	require('../app/routes/recognitioninfo.dbserver.routes.js')(app);
  require('../app/routes/profiles.dbserver.routes.js')(app);
	require('../app/routes/live.dbserver.routes.js')(app);
	require('../app/routes/daily.dbserver.routes.js')(app);

	// Configure static file serving
	app.use(express.static('./public'));

	// Configure template engine route
	app.set('views', path.join(__dirname, 'views'));

  // Error Handling
  // Handle 404 Errors
  app.use(function (req, res, next) {
    res.status(404);
    console.log('404 Warning. URL: ' + req.url);

    // Respond with html page
    if (req.accepts('html')) {
      res.render('error/404', { url: req.url });
      return;
    }

    // Respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found!' });
      return;
    }

    // Default to plain-text. send()
    res.type('txt').send('Error: Not found!');

  });

  // True error-handling middleware requires an arity of 4,
  // aka the signature (err, req, res, next).

  // Handle 403 Errors
  app.use(function (err, req, res, next) {
    if (err.status === 403) {
      res.status(err.status);
      console.log('403 Not Allowed. URL: ' + req.url + ' Err: ' + err);

      // Respond with HTML
      if (req.accepts('html')) {
        res.render('error/403', {
          error: err,
          url: req.url
        });
        return;
      }

      // Respond with json
      if (req.accepts('json')) {
        res.send({ error: 'Not Allowed!' });
        return;
      }

      // Default to plain-text. send()
      res.type('txt').send('Error: Not Allowed!');

    } else {
      // Since the error is not a 403 pass it along
      return next(err);
    }
  });

/*
  // Production 500 error handler (no stacktraces leaked to public!)
  if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      console.log('Error: ' + (err.status || 500).toString().red.bold + ' ' + err);
      res.render('error/500', {
        error: {}  // don't leak information
      });
    });
  }
*/

  // Development 500 error handler
  //if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      console.log('Error: ' + (err.status || 500).toString().red.bold + ' ' + err);
      res.render('error/500', {
        error: err
      });
    });

    // Final error catch-all just in case...
    app.use(errorHandler());
  //}

	// Return the Express application instance
	return app;
};
