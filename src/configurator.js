const development = true;

const config = development
	? require('./../configDev.json')
	: require('./../config.json');

require('dotenv').config({
  	path: development ? '.envDev' : '.env'
});

module.exports = { config, development }