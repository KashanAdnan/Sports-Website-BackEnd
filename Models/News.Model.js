const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = {
  NewsModel: NewsModel,
};
