let getModel;

module.exports.resolversFunction = (modelsArray, querys) => {
  // resolves object
  const resolvers = {
    Query: {}
  };

  for (let i = 0; i < querys.length; i += 1) {
    if (querys[i].type === 'Int' || querys[i].type === 'Float') {
      resolvers.Query[querys[i].query] = searched => getModel(querys[i], modelsArray).find({ [querys[i].value]: searched[querys[i].value] });
    } else if (querys[i].type === 'Boolean') {
      resolvers.Query[querys[i].query] = searched => getModel(querys[i], modelsArray).find({ [querys[i].value]: searched[querys[i].value] });
    } else {
      resolvers.Query[querys[i].query] = searched => getModel(querys[i], modelsArray).find({ [querys[i].value]: { $regex: searched[querys[i].value], '$options': 'i' } });
    }
  }

  return resolvers;
};

// go through all of the models and create their 'Find' function
// add the function and 'function variable' to the resolves object
getModel = (query, modelsArray) => {
  for (let i = 0; i < modelsArray.length; i += 1) {
    if (query.model === modelsArray[i].name) {
      return modelsArray[i].model;
    }
  }
};
