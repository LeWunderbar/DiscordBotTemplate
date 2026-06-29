const mongoose = require('mongoose');
const { client } = require('./clientHandler');
const log = require('../utils/log');

async function shutdownAndCleanup() {
  log('\x1b[38;2;87;117;144m[Shutdown] \x1b[32mShutting Down ...');

  try {
    await mongoose.disconnect();
    log('\x1b[38;2;87;117;144m[Database] \x1b[32mMongoDB \u001b[37m Disconnected.');
  } catch (error) {
    log(`[Shutdown] MongoDB disconnect skipped: ${error.message}`);
  }

  try {
    await client.destroy();
    log('\x1b[38;2;87;117;144m[Client] \x1b[32mBot client \u001b[37m Disconnected.');
  } catch (error) {
    log(`[Shutdown] Client destroy skipped: ${error.message}`);
  }

  log('\x1b[38;2;87;117;144m[Shutdown] \x1b[32mShutting Successful. Goodbye!');
}

process.on('SIGINT', async () => {
  await shutdownAndCleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await shutdownAndCleanup();
  process.exit(0);
});
