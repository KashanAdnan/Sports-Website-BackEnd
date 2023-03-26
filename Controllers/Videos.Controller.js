const { VideoModel } = require("../Models/Videos.Model");
const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("../Middleware/catch.Async.error");
const sendToken = require("../Utils/Send.Token");
// Creating Videos
const AddVideos = catchAsyncError(async (req, res, next) => {
  const { thumbnail, video, date, title, paragraph } = req.body;
  const Videos = await VideoModel.create({
    title: title,
    paragraph: paragraph,
    thumbnail: thumbnail,
    video: video,
    Date: date,
  });
  res.status(201).send({
    Videos,
  });
});

const updateVideos = catchAsyncError(async (req, res, next) => {
  const { thumbnail, video, date } = req.body;
  const newVideosData = {
    thumbnail: thumbnail,
    video: video,
  };
  const Videos = await VideoModel.findByIdAndUpdate(
    req.params.id,
    newVideosData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    succes: true,
    Videos,
  });
});
const getAllVideoss = catchAsyncError(async (req, res, next) => {
  const Videos = await VideoModel.find();
  res.status(200).json({
    succes: true,
    Videos,
  });
});
const getSingleVideos = catchAsyncError(async (req, res, next) => {
  const Videos = await VideoModel.findById(req.params.id);
  if (!Videos) {
    return next(
      new ErrorHandler(`Videos Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    Videos,
  });
});
const DeleteVideos = catchAsyncError(async (req, res, next) => {
  const Videos = await VideoModel.findById(req.params.id);
  if (!Videos) {
    return next(
      new ErrorHandler(`Videos Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await Videos.remove();
  res.status(200).json({
    succes: true,
    Videos,
  });
});
module.exports = {
  AddVideos,
  updateVideos,
  getAllVideoss,
  getSingleVideos,
  DeleteVideos,
};
