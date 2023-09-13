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

export const getSpaces = () => Space.find().all();
export const getSpaceById = (id) => Space.findById(id);
export const getSpaceByCategories = (categories) => Space.find().where('categories').in(categories);
export const findSpaceByName = (input) => Space.find({$text: {$search: input}});
export const createSpaces = (spaces) => Space.bulkSave(spaces)
export const updateSpaceById = (id, space) =>Space.findByIdAndUpdate(id, space)