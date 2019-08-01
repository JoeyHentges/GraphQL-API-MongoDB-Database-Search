const mongoose = require('mongoose');
const { dbs } = require('./db_config');

const db1 = () => {
  mongoose.connect(dbs.db1.database, { useNewUrlParser: true });
  return mongoose;
};

const db2 = () => {
  mongoose.connect(dbs.db2.database, { useNewUrlParser: true });
  return mongoose;
};

const db3 = () => {
  mongoose.connect(dbs.db3.database, { useNewUrlParser: true });
  return mongoose;
};

const db4 = () => {
  mongoose.connect(dbs.db4.database, { useNewUrlParser: true });
  return mongoose;
};

const db5 = () => {
  mongoose.connect(dbs.db5.database, { useNewUrlParser: true });
  return mongoose;
};

module.exports.dbs = {
  db1,
  db2,
  db3,
  db4,
  db5
};
