const development = process.env.NODE_ENV !== 'production';
const configPath = development ? './../configDev.json' : './../config.json';
const config = require(configPath);

require('dotenv').config({
  path: development ? '.envDev' : '.env'
});

const normalizedConfig = {
  ...config,
  DEVS: config.DEVS || config.devs || [],
};

module.exports = { config: normalizedConfig, development };