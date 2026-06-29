const { infoMessage, unknowenError } = require('./../../../templates/embeds');
const log = require('./../../../utils/log');

module.exports = {
  buttonId: 'example',
  callback: async (client, interaction) => {
    try {
      await interaction.reply({
        embeds: [infoMessage('Button got pressed!')],
        ephemeral: true,
      });
    } catch (err) {
      log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling button:\n\x1b[0m${err}`);
      await interaction.reply({
        embeds: [unknowenError('button-example-unknowen')],
        ephemeral: true,
      });
    }
  },
};