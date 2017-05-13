const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var messageSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true }
});

module.exports = mongoose.model("Message", messageSchema);
