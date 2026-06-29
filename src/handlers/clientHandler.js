const { Client, GatewayIntentBits } = require('discord.js');
const { development } = require('./../configurator');
require('dotenv').config({
  path: development ? '.envDev' : '.env'
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let loginPromise = null;

if (process.env.TOKEN) {
  loginPromise = client.login(process.env.TOKEN).catch((error) => {
    console.error('[Client] Failed to log in:', error.message);
  });
} else {
  console.warn('[Client] No TOKEN provided. Set TOKEN in .env or .envDev to connect.');
}

module.exports = { client, loginPromise };
