const mongoHandler = require("./../../handlers/mongoHandler");
const log = require("../../utils/log")

module.exports = async (client) => {
    await mongoHandler()
}