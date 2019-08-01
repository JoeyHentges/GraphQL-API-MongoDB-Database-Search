const express = require('express');

// Bring in routes
const Search = require('./search');

const router = express.Router();

// Add routes to the router
router.use('/', Search.routes);

module.exports.routes = router;
