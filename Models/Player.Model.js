const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWTSecret = "KaLM0IKjDfsWeAVbmIo2JsL3HmTlKleqq";

const PlayerSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: [true, "Please Enter Player Name"],
    },
    playerImage: {
      type: String,
      required: [true, "Please Enter Player Image"],
    },
    CaptainName: {
      type: String,
      required: [true, "Please Enter CaptainName "],
    },
    CompanyName: {
      type: String,
      required: [true, "Please Enter CompanyName "],
    },
    Address: {
      type: String,
      required: [true, "Please Enter Address "],
    },
    City: {
      type: String,
      required: [true, "Please Enter City "],
    },
    Profashion: {
      type: String,
      required: [true, "Please Enter Profashion "],
    },
    State: {
      type: String,
      required: [true, "Please Enter State"],
    },
    Zip: {
      type: String,
      required: [true, "Please Enter Zip"],
    },
    Phone: {
      type: Number,
      required: [true, "Please Enter Phone"],
    },
    Gender: {
      type: String,
      required: [true, "Please Enter Gender"],
    },
    Hand: {
      type: String,
      required: [true, "Please Enter Your Hand"],
    },
    DateOfBirth: {
      type: String,
      required: [true, "Please Enter DateOfBirth"],
    },
  },
  { timestamps: true }
);

PlayerSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWTSecret, {
    expiresIn: "3d",
  });
};

const PlayerModel = mongoose.model("Player", PlayerSchema);

module.exports = {
  PlayerModel: PlayerModel,
};
