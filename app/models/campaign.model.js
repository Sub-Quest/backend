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

module.exports = {
  getCampains: () => Campaign.find().all(),
  getCampainById: (id) => Campaign.findById(id),
  getCampainsBySpaceId: (spaceId) => Campaign.where({ spaceId: spaceId }).find().all(),
  findCampainsByName: (input) => Campaign.find({ $text: { $search: input } }).all(),
};