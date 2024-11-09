//////////////////////////
// Imports of Index.js //
/////////////////////////

const { Client, IntentsBitField } = require('discord.js');
const { development } = require("./configurator")

const eventHandler = require('./handlers/eventHandler');
const mongoHandler = require("./handlers/mongoHandler");
const log = require("./utils/log")

/////////////
// Configs //
/////////////

const client = new Client({
  	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
  	],
});

require('dotenv').config({
	path: development ? '.envDev' : '.env'
});

////////////////
// Launch Bot //
////////////////

console.clear();
console.log(`
	██╗      ██████╗ ██╗   ██╗    ███╗   ███╗██████╗ ██████╗
	╚██╗     ██╔══██╗╚██╗ ██╔╝    ████╗ ████║╚════██╗╚════██╗
	 ╚██╗    ██████╔╝ ╚████╔╝     ██╔████╔██║ █████╔╝ █████╔╝
	 ██╔╝    ██╔══██╗  ╚██╔╝      ██║╚██╔╝██║██╔═══╝  ╚═══██╗
	██╔╝     ██████╔╝   ██║       ██║ ╚═╝ ██║███████╗██████╔╝
	╚═╝      ╚═════╝    ╚═╝       ╚═╝     ╚═╝╚══════╝╚═════╝                                                
`);
log(`\x1b[38;2;243;114;44m[Launcher] \x1b[32mStarting Bot ...`);

(async () => {
	try {
		eventHandler(client);
		mongoHandler();

		client.login(process.env.TOKEN);
	} catch (error) {
		log(`There was an error! \n \n ${error}`)
	}
})();
