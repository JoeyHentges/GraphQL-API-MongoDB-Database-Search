const { Schema } = require('mongoose');
const { dbs } = require('../../configs');
const searchSchema = require('../search-schema');

// set of the schema for a specific model
const getSchema = (variables) => {
  let str = '';
  for (let i = 0; i < variables.length; i += 1) {
    if (i === 0) {
      str += `  `;
    }
    str += `"${variables[i][0]}": "${variables[i][1]}"`;
    if (i !== variables.length - 1) {
      str += `,
      `;
    }
  }
  return str;
};

// generate the model using the schema created above
// then push the model onto the models array
let modelsArray = [];
for (let i = 0; i < searchSchema.length; i += 1) {
  const schema = getSchema(searchSchema[i].variables);
  const str =  `
    {
    ${schema}
    }
  `;
  modelsArray.push({
    model: dbs.db1().model(searchSchema[i].model, new Schema(JSON.parse(str))),
    name: searchSchema[i].model
  });
};

module.exports.modelsArray = modelsArray;