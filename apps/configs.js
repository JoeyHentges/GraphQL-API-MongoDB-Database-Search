const { dbConfig } = require('../main/configs/db/db_config');
const { dbs } = require('../main/configs/db/db_connection');
const searchSchema = require('../main/configs/search-schema');

module.exports = {
  dbConfig,
  dbs,
  searchSchema
};
