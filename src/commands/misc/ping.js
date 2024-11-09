module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,
    // permissionsRequired: // EXSAMPLE: [PermissionFlagsBits.Administrator],
    // botPermissions: 
  
    callback: async(client, interaction) => {
      await interaction.deferReply();
      const reply = await interaction.fetchReply();
      const ping = reply.createdTimestamp - interaction.createdTimestamp;
      interaction.editReply(`Pong! Client: ${ping}ms, Websocket: ${client.ws.ping}ms.`)
  },
}