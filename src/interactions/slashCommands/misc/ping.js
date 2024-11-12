const { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { infoMessage, unknowenError } = require("./../../../templates/embeds");
const log = require("../../../utils/log");

module.exports = {
	name: 'ping',
	description: 'Pong!',
	// devOnly: Boolean,
	// testOnly: Boolean,
	// options: Object[],
	// deleted: Boolean,
	// permissionsRequired: // example: [PermissionFlagsBits.Administrator],
	// botPermissions: // example: [PermissionFlagsBits..., PermissionFlagsBits...],
  
	callback: async(client, interaction) => {
		try {
			await interaction.deferReply();
			const reply = await interaction.fetchReply();
			const ping = reply.createdTimestamp - interaction.createdTimestamp;
			interaction.editReply({
				embeds: [infoMessage(`Pong! Client: ${ping}ms, Websocket: ${client.ws.ping}ms.`)],
				ephemeral: false
			});
		} catch (err) {
			log(`\x1b[31m[Error] \x1b[32mAn error occurred:\n\x1b[0m${err}`)
			interaction.reply({
				embeds: [unknowenError("/ping-unknowen")],
				ephemeral: true
			});
		}
  	},
}