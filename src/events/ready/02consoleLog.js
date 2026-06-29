const { ActivityType, EmbedBuilder } = require('discord.js');
const path = require('path');
const { config } = require('./../../configurator');
const getAllFiles = require('./../../utils/getAllFiles');
const log = require('./../../utils/log');

module.exports = async (client) => {
  const selectMenuCategories = getAllFiles(path.join(__dirname, '../..', 'interactions/selectMenus'), true);
  const selectMenus = selectMenuCategories.flatMap((category) => getAllFiles(category, false));
  selectMenus.map((file) => path.parse(file).name).sort().forEach((name) => {
    log(`\x1b[38;2;144;190;109m[SelectMenu] \x1b[32m${name}\x1b[0m has been loaded.`);
  });

  const buttonCategories = getAllFiles(path.join(__dirname, '../..', 'interactions/buttons'), true);
  const buttons = buttonCategories.flatMap((category) => getAllFiles(category, false));
  buttons.map((file) => path.parse(file).name).sort().forEach((name) => {
    log(`\x1b[38;2;67;170;139m[Button] \x1b[32m${name}\x1b[0m has been loaded.`);
  });

  log(`\x1b[38;2;87;117;144m[Client] \x1b[32m${client.user.username} \u001b[37mis connected and service Online.`);
  await client.user.setPresence({
    activities: [{ name: config.BOT_STATUS || 'discord.js', type: ActivityType.Playing }],
    status: 'online',
  });

  const embed = new EmbedBuilder()
    .setTitle('Online')
    .setColor('Green')
    .setAuthor({ name: `Bot: ${client.user.tag} (${client.user.id})`, iconURL: client.user.displayAvatarURL() });

  const channel = client.channels.cache.get(config.LOG_CHANNEL);
  if (channel?.isTextBased?.()) {
    await channel.send({ embeds: [embed] });
  }
};