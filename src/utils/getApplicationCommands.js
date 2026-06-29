module.exports = async (client, guildId) => {
  let applicationCommands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = client.application?.commands;
  }

  if (!applicationCommands) {
    throw new Error('Application commands manager is not available.');
  }

  await applicationCommands.fetch();
  return applicationCommands;
};