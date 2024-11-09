const { Client, IntentsBitField, EmbedBuilder, Guild } = require("discord.js");
const {config} = require("../../configurator")
const log = require("../../utils/log")

module.exports = (client) => {
    const c = client
    log(`\x1b[38;2;87;117;144m[Client] \x1b[32m${c.user.username} \u001b[37mis online!`)
    c.user.setActivity({name: config.BOT_STATUS});
    const embed = new EmbedBuilder()
    .setTitle("Online")
    .setColor("Green")
    .setAuthor({ name: "Bot: " + c.user.tag + " (" + c.user.id + ")", iconURL: c.user.avatarURL()})
    const channel = client.channels.cache.get(config.LOG_CHANNEL)
    channel.send({ embeds: [embed] })
};