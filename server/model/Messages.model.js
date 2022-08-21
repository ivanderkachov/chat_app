const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  convId: String,
  sender: String,
  text: String
});

module.exports = mongoose.model("chat_users", messageSchema);
