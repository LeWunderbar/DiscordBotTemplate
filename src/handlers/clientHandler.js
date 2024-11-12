const { Client, IntentsBitField } = require('discord.js');
const { development } = require("./../configurator");
require('dotenv').config({
  path: development ? '.envDev' : '.env'
});

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.login(process.env.TOKEN);
module.exports = { client };
