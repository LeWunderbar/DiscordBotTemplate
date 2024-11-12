const { Client, IntentsBitField, EmbedBuilder, Guild } = require("discord.js");
const path = require('path');
const {config} = require("./../../configurator")
const getAllFiles = require("./../../utils/getAllFiles");
const log = require("./../../utils/log")

module.exports = (client) => {
    const SelectMenuCatagorys = getAllFiles(path.join(__dirname, '../..', 'interactions/selectMenus'), true);
    let SelectMenus = [];
    SelectMenuCatagorys.forEach((selectMenuCatagory) => {
        SelectMenus.push(...getAllFiles(path.join(selectMenuCatagory), false));
    });

    const selectMenuNames = SelectMenus.map(file => path.parse(file).name).sort();
    selectMenuNames.forEach((selectMenuName) => {
        log(`\x1b[38;2;144;190;109m[SelectMenu] \x1b[32m${selectMenuName}\x1b[0m has been loaded.`)
    });



    const buttonsCatagorys = getAllFiles(path.join(__dirname, '../..', 'interactions/buttons'), true);
    let buttons = [];
    buttonsCatagorys.forEach((buttonsCatagory) => {
        buttons.push(...getAllFiles(path.join(buttonsCatagory), false));
    });

    const buttonNames = buttons.map(file => path.parse(file).name).sort();
    buttonNames.forEach((buttonName) => {
        log(`\x1b[38;2;67;170;139m[Button] \x1b[32m${buttonName}\x1b[0m has been loaded.`)
    });



    log(`\x1b[38;2;87;117;144m[Client] \x1b[32m${client.user.username} \u001b[37mis connected and service Online.`)
    client.user.setActivity({name: config.BOT_STATUS});
    const embed = new EmbedBuilder()
        .setTitle("Online")
        .setColor("Green")
        .setAuthor({ name: "Bot: " + client.user.tag + " (" + client.user.id + ")", iconURL: client.user.avatarURL()})
    const channel = client.channels.cache.get(config.LOG_CHANNEL)
    channel.send({ embeds: [embed] })
};