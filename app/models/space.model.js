const mongoose = require("mongoose");

const Space = mongoose.model(
  "Space",
  new mongoose.Schema({
    name: { type: String, text : true },
    imageUrl: String,
    categories: { type: Array, index: true },
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

module.exports = {
  getSpaces: () => Space.find().all(),
  getSpaceById: (id) => Space.findById(id),
  getSpaceByCategories: (categories) => Space.find().where('categories').in(categories),
  findSpaceByName: (input) => Space.find({ $text: { $search: input } }),
  createSpaces: (spaces) => Space.bulkSave(spaces),
  updateSpaceById: (id, space) => Space.findByIdAndUpdate(id, space),
};