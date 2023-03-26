const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: [true, "Please Enter Thumbnail"],
    },
    title: {
      type: String,
      required: [true, "Please Enter title"],
    },
    paragraph: {
      type: String,
      required: [true, "Please Enter paragraph"],
    },
    video: {
      type: String,
      required: [true, "Please Enter Video"],
    },
    Date: {
      type: Date,
      default: Date.now(),
      required: [true, "Please Enter CaptainName "],
    },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Videos", VideoSchema);

module.exports = {
  VideoModel: VideoModel,
};
