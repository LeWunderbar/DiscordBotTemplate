const { infoMessage, unknowenError } = require('./../../../templates/embeds');
const log = require('./../../../utils/log');

module.exports = {
  selectMenuId: 'example',
  callback: async (client, interaction) => {
    try {
      await interaction.reply({
        embeds: [infoMessage(`You have selected ${interaction.values[0]}`)],
        ephemeral: true,
      });
    } catch (err) {
      log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling selectMenu:\n\x1b[0m${err}`);
      await interaction.reply({
        embeds: [unknowenError('selectMenu-example-unknowen')],
        ephemeral: true,
      });
    }
  },
};

/* Making SelectMenus:
Docs for selectMenu Types and data:
https://discordjs.guide/message-components/select-menus.html#auto-populating-select-menus

(Imports Required)

const select = new StringSelectMenuBuilder()
	.setCustomId('example')  // Set Custom ID for the menu itself
	.setPlaceholder('Make a selection!')
	.addOptions(
		new StringSelectMenuOptionBuilder()
			.setLabel('Bulbasaur')
			.setDescription('The dual-type Grass/Poison Seed Pokémon.')
			.setValue('bulbasaur'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Charmander')
			.setDescription('The Fire-type Lizard Pokémon.')
			.setValue('charmander'),
		new StringSelectMenuOptionBuilder()
			.setLabel('Squirtle')
			.setDescription('The Water-type Tiny Turtle Pokémon.')
			.setValue('squirtle')
	);

const row = new ActionRowBuilder()
	.addComponents(select);

interaction.reply({
	components: [row],
	embeds: [infoMessage("Testing!")],
	ephemeral: true
});

*/

