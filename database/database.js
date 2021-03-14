const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const env = require('../.env');

// Local
module.exports = {
  connect: () => mongoose.connect(env.DB_PATH_LOCAL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }),
  mongoose,
};

// Cloud
/* module.exports = {
  connect: () => mongoose.connect(env.DB_PATH_CLOUD,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }),
  mongoose,
}; */ 
