const mongoHandler = require('./../../handlers/mongoHandler');
const log = require('../../utils/log');

module.exports = async () => {
  try {
    if (process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGODB_PASSWORD) {
      await mongoHandler();
    } else {
      log('[Services] MongoDB not configured. Skipping database connection.');
    }
  } catch (error) {
    log(`[Error] ${error.message}`);
  }
};