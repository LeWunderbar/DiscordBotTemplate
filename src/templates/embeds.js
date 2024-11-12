const { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { client } = require("./../handlers/clientHandler");
const log = require("./../utils/log")

const botAvatar = client.user.displayAvatarURL({
    format: 'png',
    size: 512
});

function infoMessage(info, color = "#f55a42") {
    try {
        const embed = new EmbedBuilder()
            .setDescription(`**${info}**`)
            .setTimestamp()
            .setColor(color)
            .setFooter({ text: client.user.username, iconURL: botAvatar });
        return embed
    } catch (err) {
        log(`\x1b[31m[Error] \x1b[32mAn error occurred in embeds.js (infoMessageEmbed):\n\x1b[0m${err}`)
    }
}

function unknowenError(error) {
    try {
        const embed = new EmbedBuilder()
            .setDescription("An error occurred while processing your request. The error has been logged. Please notify the bot developers.")
            .setTitle("Unknowen Error")
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: botAvatar })
            .setColor("#8c1806")
            .addFields(
                { name: "Error Code", value: `${error}`}
            )
        return embed
    } catch (err) {
        log(`\x1b[31m[Error] \x1b[32mAn error occurred in embeds.js (unknowenErrorEmbed):\n\x1b[0m${err}`)
    }
}
 
module.exports = {
    infoMessage,
    unknowenError
}