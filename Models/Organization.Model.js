const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const JWTSecret = "KaLM0IKjDfsWeAVbmIo2JsL3HmTlKleqq";

const OrganizationSchema = new mongoose.Schema(
  {
    OrganizationName: {
      type: String,
      required: [true, "Please Enter Organization Name"],
    },
    ReplyEmail: {
      type: String,
      required: [true, "Please Enter Email"],
      validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    Location: {
      type: String,
      required: [true, "Please Enter Location"],
    },
    Language: {
      type: String,
      required: [true, "Please Enter Language"],
    },
    TimeZone: {
      type: Date,
    },
    PlayerCount: {
      default: 0,
    },
  },
  { timestamps: true }
);

const OragnizationModel = mongoose.model("Organizaion", OrganizationSchema);

OrganizationSchema.methods.getJWTToken = () => {
  return jwt.sign({ id: this._id }, JWTSecret, {
    expiresIn: "3d",
  });
};
module.exports = {
  OragnizationModel: OragnizationModel,
};
