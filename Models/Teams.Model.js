const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema(
  {
    TeamN: {
      type: String,
      required: true,
    },
    Flag: {
      type: String,
      required: true,
    },
    ranking: {
      type: String,
    },
  },
  { timestamps: true }
);

const TeamsModel = mongoose.model("Player", TeamsSchema);

module.exports = {
  TeamsModel: TeamsModel,
};
