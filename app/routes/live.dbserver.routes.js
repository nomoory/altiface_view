// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'live' controller
	var live = require('../controllers/live.dbserver.controller');

	// Mount the 'live' controller's 'getRanks' method
	app.get('/altiface/reports/ranking/live', live.request );
};
