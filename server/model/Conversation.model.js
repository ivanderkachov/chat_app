const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: [],
  messages:[{
    sender: String,
    text: String,
    createdAt: String
  }]
},{ timestamps: true });

module.exports = mongoose.model("conversations", conversationSchema);
