/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const { graphql } = require('graphql');
const express = require('express');
const { checkKey } = require('../../tools');

const router = express.Router();

const setup = async () => {
  const {
    models, typedefs, querys, resolvers
  } = await require('../setup').requiredItems();

  for (let i = 0; i < models.length; i += 1) {
    const keys = Object.keys(models[i].model.schema.obj);
    for (let j = 0; j < keys.length; j += 1) {
      router.get(`/${models[i].name}/${keys[j]}`, checkKey, async (req, res) => {
        // parameters
        const { search } = req.body;

        const queryInfo = querys.filter(obj => obj.model === models[i].name && obj.value === keys[j])[0];

        let searchResult;
        if (queryInfo.type === 'Int' || queryInfo.type === 'Float' || queryInfo.type === 'Boolean') {
          searchResult = await graphql(typedefs,
            `{ ${queryInfo.query}(${queryInfo.value}: ${search}) { ${queryInfo.value} id ${queryInfo.defaultReturns} } }`,
            resolvers.Query).then(response => response.data);
        } else {
          searchResult = await graphql(typedefs,
            `{ ${queryInfo.query}(${queryInfo.value}: "${search}") { ${queryInfo.value} id ${queryInfo.defaultReturns} } }`,
            resolvers.Query).then(response => response.data);
        }

        if (searchResult[queryInfo.query][0] !== undefined) {
          res.send({
            model: queryInfo.model,
            variable: queryInfo.value,
            type: queryInfo.type,
            value: searchResult[queryInfo.query]
          });
        } else {
          res.send({
            status: 'failure',
            reason: 'unknown'
          });
        }
      });
    }
  }
  // clear all models from mongoose
  mongoose.models = {};
};

setup();

module.exports.routes = router;
