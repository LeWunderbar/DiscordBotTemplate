const path = require('path');
const getAllFiles = require('../utils/getAllFiles');
const log = require("./../utils/log")

const { client } = require("./clientHandler");

module.exports = () => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)

  for (const eventFolder of eventFolders) {
      const eventFiles = getAllFiles(eventFolder);
      eventFiles.sort((a, b) => a > b);

      const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
    
      log(`\x1b[38;2;243;114;44m[Events] \x1b[32m${eventName}\x1b[0m has been loaded.`)

      client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
          const eventFunction = require(eventFile);
          await eventFunction(client, arg);
      }
    });
  }
}