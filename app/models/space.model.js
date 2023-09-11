const mongoose = require("mongoose");

const Space = mongoose.model(
  "Space",
  new mongoose.Schema({
    name: String,
    imageUrl: String,
    category: Array,
    websiteUrl: String,
    discordUrl: String,
    telegramUrl: String,
    description: String,
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = Space;
