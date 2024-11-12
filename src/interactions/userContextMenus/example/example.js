const { PermissionFlagsBits, ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("example")
		.setType(ApplicationCommandType.User),

//  devOnly: [boolean],
//  testOnly: [boolean],
//  deleted: [boolean],
//  permissionsRequired [Array],
//  botPermissions [Array],
	callback: async (client, interaction) => {
		try {
			
			interaction.reply(`An user used an UserContextCommand on user with id ${interaction.targetUser.id}`)

		} catch (err) {
			log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling userContextMenu:\n\x1b[0m${err}`);
			interaction.reply({
				embeds: [unknowenError("userContextMenu-example-unknowen")],
				ephemeral: true
			});
		}
	},
};