const mongoose = require("mongoose");

const Campaign = mongoose.model(
  "Campaign",
  new mongoose.Schema({
    name: String,
    startTime: Date,
    endTime: Date,
    coverImageUrl: String,
    description: String,
    
  })
);

module.exports = Campaign;
