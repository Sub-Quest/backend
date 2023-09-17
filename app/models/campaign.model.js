const mongoose = require("mongoose");

const Campaign = mongoose.model(
  "Campaign",
  new mongoose.Schema({
    name: { type: String, text : true },
    spaceId: { type: String, index: true },
    startTime: { type: Date, index: true },
    endTime: { type: Date, index: true },
    coverImageUrl: String,
    description: String,
    categories: { type: Array, index: true }
  })
);

module.exports = Campaign;

export const getCampains = () => Campaign.find().all();
export const getCampainById = (id) => Campaign.findById(id);
export const getCampainsBySpaceId = (spaceId) => Campaign.where({spaceId: spaceId}).find().all();
export const findCampainsByName = (input) => Campaign.find({$text: {$search: input}}).all();
