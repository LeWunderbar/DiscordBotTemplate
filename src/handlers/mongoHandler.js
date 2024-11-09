const mongoose = require('mongoose')

const { development } = require("./../configurator");
const log = require('../utils/log');
require('dotenv').config({
    path: development ? '.envDev' : '.env'
  });

module.exports = async() => {
    await mongoose.connect(process.env.MONGODB,)
    .then(() => {
        log(`\x1b[38;2;144;190;109m[Database] \x1b[32mMongoDB\x1b[0m is connected.`)
    })
}