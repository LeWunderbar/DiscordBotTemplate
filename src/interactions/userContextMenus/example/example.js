const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { infoMessage, unknowenError } = require('./../../../templates/embeds');
const log = require('./../../../utils/log');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('example')
    .setType(ApplicationCommandType.User),
  callback: async (client, interaction) => {
    try {
      await interaction.reply({
        embeds: [infoMessage(`An user used an UserContextCommand on user with id ${interaction.targetUser.id}`)],
        ephemeral: true,
      });
    } catch (err) {
      log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling userContextMenu:\n\x1b[0m${err}`);
      await interaction.reply({
        embeds: [unknowenError('userContextMenu-example-unknowen')],
        ephemeral: true,
      });
    }
  },
};