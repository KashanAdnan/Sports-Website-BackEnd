const { NewsModel } = require("../Models/News.Model");
const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("../Middleware/catch.Async.error");
const sendToken = require("../Utils/Send.Token");
// Creating News
const AddNews = catchAsyncError(async (req, res, next) => {
  const { thumbnail, paragraph, Title, Date } = req.body;
  const News = await NewsModel.create({
    thumbnail: thumbnail,
    Title: Title,
    paragraph: paragraph,
    Date: Date,
  });
  res.status(201).send({
    News,
  });
});

const updateNews = catchAsyncError(async (req, res, next) => {
  const { thumbnail, paragraph, Title, Date } = req.body;
  const newNewsData = {
    thumbnail: thumbnail,
    Title: Title,
    paragraph: paragraph,
    Date: Date,
  };
  const News = await NewsModel.findByIdAndUpdate(req.params.id, newNewsData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    succes: true,
    News,
  });
});
const getAllNewss = catchAsyncError(async (req, res, next) => {
  const News = await NewsModel.find();
  res.status(200).json({
    succes: true,
    News,
  });
});
const getSingleNews = catchAsyncError(async (req, res, next) => {
  const News = await NewsModel.findById(req.params.id);
  if (!News) {
    return next(
      new ErrorHandler(`News Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    News,
  });
});
const DeleteNews = catchAsyncError(async (req, res, next) => {
  const News = await NewsModel.findById(req.params.id);
  if (!News) {
    return next(
      new ErrorHandler(`News Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await News.remove();
  res.status(200).json({
    succes: true,
    News,
  });
});
module.exports = {
  AddNews,
  updateNews,
  getAllNewss,
  getSingleNews,
  DeleteNews,
};
