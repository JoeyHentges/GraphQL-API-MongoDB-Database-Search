/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const { graphql } = require('graphql');
const express = require('express');
const { checkKey } = require('../../tools');

const router = express.Router();

let searchItems;

router.get('/', checkKey, async (req, res) => searchItems(req.body, res));

// Get the User by its ID
searchItems = async (body, res) => {
  const {
    typedefs, querys, resolvers
  } = await require('../setup').requiredItems();

  const result = [];
  for (let i = 0; i < querys.length; i += 1) {
    // get the search result for a query
    let searchResult;
    if (querys[i].type === 'Int' || querys[i].type === 'Float' || querys[i].type === 'Boolean') {
      searchResult = await graphql(typedefs,
        `{ ${querys[i].query}(${querys[i].value}: ${body.search}) { ${querys[i].value} id ${querys[i].defaultReturns} } }`,
        resolvers.Query).then(response => response.data);
    } else {
      searchResult = await graphql(typedefs,
        `{ ${querys[i].query}(${querys[i].value}: "${body.search}") { ${querys[i].value} id ${querys[i].defaultReturns} } }`,
        resolvers.Query).then(response => response.data);
    }

    // check of the result is null - if it is not, push it onto the array
    if (searchResult !== undefined) {
      if (searchResult[querys[i].query][0] !== undefined) {
        result.push({
          model: querys[i].model,
          variable: querys[i].value,
          type: querys[i].type,
          value: searchResult[querys[i].query]
        });
      }
    }
  }

  // clear all models from mongoose
  mongoose.models = {};

  res.send(result);
};

module.exports.routes = router;
