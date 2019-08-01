const { Schema } = require('mongoose');

// set of the schema for a specific model
let getSchema = (variables) => {
  let str = '';
  for (let i = 0; i < variables.length; i += 1) {
    if (i === 0) {
      str += `  `;
    }
    let variableType = variables[i][1];
    if (variableType === 'Int' || variableType === 'Float') {
      variableType = 'Number';
    }
    str += `"${variables[i][0]}": "${variableType}"`;
    if (i !== variables.length - 1) {
      str += `,
      `;
    }
  }
  return str;
};

module.exports.modelsArray = (dbs, searchSchema) => {
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
      model: dbs[searchSchema[i].database]().model(searchSchema[i].model, new Schema(JSON.parse(str))),
      name: searchSchema[i].model
    });
  };
  return modelsArray
};
