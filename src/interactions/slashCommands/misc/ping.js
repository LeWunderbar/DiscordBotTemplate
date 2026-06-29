const { SlashCommandBuilder } = require('discord.js');
const { infoMessage, unknowenError } = require('./../../../templates/embeds');
const log = require('../../../utils/log');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();
      const reply = await interaction.fetchReply();
      const ping = reply.createdTimestamp - interaction.createdTimestamp;
      await interaction.editReply({
        embeds: [infoMessage(`Pong! Client: ${ping}ms, Websocket: ${client.ws.ping}ms.`)],
      });
    } catch (err) {
      log(`\x1b[31m[Error] \x1b[32mAn error occurred:\n\x1b[0m${err}`);
      await interaction.reply({
        embeds: [unknowenError('/ping-unknowen')],
        ephemeral: true,
      });
    }
  },
};