const { modelsArray } = require('./models/models');
const { typedefsFunction } = require('./controllers/typeDefs/typedefs');
const { resolversFunction } = require('./controllers/resolvers/resolvers');

const { dbs, dbConfig, searchSchema } = require('../configs');

module.exports.requiredItems = async () => {
  const models = await modelsArray(await dbs(dbConfig), searchSchema);
  const { typedefs, querys } = typedefsFunction(searchSchema);
  const resolvers = resolversFunction(models, querys);

  return {
    models,
    typedefs,
    querys,
    resolvers
  };
};
