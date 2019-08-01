const mongoose = require('mongoose');
const { graphql } = require('graphql');
const express = require('express');
const { checkKey } = require('../../tools');
const { modelsArray } = require('../models/models');
const { typedefsFunction } = require('../controllers/typeDefs/typedefs');
const { resolversFunction } = require('../controllers/resolvers/resolvers');

const router = express.Router();

let searchItems;

router.get('/', checkKey, async (req, res) => searchItems(req.body, res));

// Get the User by its ID
searchItems = async (body, res) => {
  const { dbs, dbConfig, searchSchema } = require('../../configs');

  const models = await modelsArray(await dbs(dbConfig), searchSchema);
  const { typedefs, querys } = typedefsFunction(searchSchema);
  const resolvers = resolversFunction(models, querys);

  const result = [];
  for (let i = 0; i < querys.length; i += 1) {
    // get the search result for a query
    let searchResult;
    if (querys[i].type === 'Int' || querys[i].type === 'Float' || querys[i].type === 'Boolean') {
      searchResult = await graphql(typedefs,
      `{ ${querys[i].query}(${querys[i].value}: ${body.search}) { ${querys[i].value} id } }`,
      resolvers.Query).then(response => response.data);
    } else {
      searchResult = await graphql(typedefs,
        `{ ${querys[i].query}(${querys[i].value}: "${body.search}") { ${querys[i].value} id } }`,
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

  res.send(result)
};

module.exports.routes = router;
