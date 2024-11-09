const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    // name, type, required, default
});

module.exports = mongoose.model("schema", schema);