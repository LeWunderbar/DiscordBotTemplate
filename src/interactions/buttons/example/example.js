const { PermissionFlagsBits } = require("discord.js");

module.exports = {
	buttonId: 'example',
//  devOnly: [boolean],
//  testOnly: [boolean],
//  permissionsRequired [Array],
//  botPermissions [Array],

	callback: async (client, interaction) => {
		try {
			interaction.reply({
				content: "Button got pressed!",
				ephemeral: true
			});
		} catch (err) {
			log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling button:\n\x1b[0m${err}`);
			interaction.reply({
				embeds: [unknowenError("button-example-unknowen")],
				ephemeral: true
			});
		}
	},
};