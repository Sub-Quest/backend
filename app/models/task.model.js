const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    name: String,
    startTime: Date,
    endTime: Date,
    coverImageUrl: String,
    description: String,
    
  })
);

module.exports = Task;
