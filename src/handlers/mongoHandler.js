const mongoose = require('mongoose');
const log = require('../utils/log');

module.exports = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGODB;

  if (!uri) {
    log('[Database] MongoDB URI not provided. Skipping connection.');
    return;
  }

  await mongoose.connect(uri);
  log('\x1b[38;2;87;117;144m[Database] \x1b[32mMongoDB\x1b[0m is connected and service Online.');
};