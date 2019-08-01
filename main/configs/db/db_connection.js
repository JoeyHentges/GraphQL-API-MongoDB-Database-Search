const mongoose = require('mongoose');

module.exports.dbs = async (dbs) => {
  const dbsObj = {};
  for (let i = 0; i < dbs.length; i += 1) {
    dbsObj[dbs[i].name] = () => {
      mongoose.connect(dbs[i].database, { useNewUrlParser: true });
      return mongoose;
    };
  }
  return dbsObj;
}