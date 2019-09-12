const { buildSchema } = require('graphql');

let getTypes;
let getVariables;
let getQuerys;

module.exports.typedefsFunction = (searchSchema) => {
  const types = getTypes(searchSchema);
  const { str, querys } = getQuerys(searchSchema);

  const defs = `
  scalar Date
  scalar JSON
  ${types}
  ${str}
`;

  return { typedefs: buildSchema(`${defs}`), querys };
};

// set up the type schema for each model
getTypes = (searchSchema) => {
  let str = '';
  for (let i = 0; i < searchSchema.length; i += 1) {
    const variables = getVariables(searchSchema[i].variables);
    str += `
    type ${searchSchema[i].model} {
      id: ID
    ${variables}
    }
    `;
  }
  return str;
};

// get the variables and set up the string for the specific model
getVariables = (variables) => {
  let str = '';
  for (let i = 0; i < variables.length; i += 1) {
    if (i === 0) {
      str += '  ';
    }
    str += `${variables[i][0]}: ${variables[i][1]}`;
    if (i !== variables.length - 1) {
      str += `
      `;
    }
  }
  return str;
};

// finally set up the query functions each model
// only 1 per model
getQuerys = (searchSchema) => {
  let str = 'type Query {';
  const querys = [];
  for (let i = 0; i < searchSchema.length; i += 1) {
    for (let j = 0; j < searchSchema[i].variables.length; j += 1) {
      str += `
        get${searchSchema[i].model}By${searchSchema[i].variables[j][0]}( ${searchSchema[i].variables[j][0]}: ${searchSchema[i].variables[j][1]}! ): [${searchSchema[i].model}]`;
      querys.push({
        model: searchSchema[i].model,
        query: `get${searchSchema[i].model}By${searchSchema[i].variables[j][0]}`,
        value: searchSchema[i].variables[j][0],
        type: searchSchema[i].variables[j][1],
        defaultReturns: searchSchema[i].defaultReturns.join(' ')
      });
    }
  }
  str += `
    }`;
  return { str, querys };
};
