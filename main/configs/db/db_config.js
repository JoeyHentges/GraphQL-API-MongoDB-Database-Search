require('dotenv').config();

module.exports.dbs = {
  db1: {
    secret: process.env.MONGO_DB_1_SECRET,
    database: process.env.MONGO_DB_1_URL
  },
  db2: {
    secret: process.env.MONGO_DB_2_SECRET,
    database: process.env.MONGO_DB_2_URL
  },
  db3: {
    secret: process.env.MONGO_DB_3_SECRET,
    database: process.env.MONGO_DB_3_URL
  },
  db4: {
    secret: process.env.MONGO_DB_4_SECRET,
    database: process.env.MONGO_DB_4_URL
  },
  db5: {
    secret: process.env.MONGO_DB_5_SECRET,
    database: process.env.MONGO_DB_5_URL
  }
};
