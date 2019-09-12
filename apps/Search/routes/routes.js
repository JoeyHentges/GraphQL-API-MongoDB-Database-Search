const express = require('express');

// Bring in routes
const Search = require('./search');
const SearchIndividual = require('./search-individual');

const router = express.Router();

// Add routes to the router
router.use('/', Search.routes);
router.use('/', SearchIndividual.routes);

module.exports.routes = router;
