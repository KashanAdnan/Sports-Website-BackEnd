const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("./catch.Async.error");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.Model");
const { PlayerModel } = require("../Models/Player.Model.js");
const JWTSecret = "KaLM0IKjDfsWeAVbmIo2JsL3HmTlKleqq";

exports.isAuthenticateUser= catchAsyncError(async (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) {
    res.redirect("/")
  } else {
    const decodedData = jwt.verify(token, JWTSecret);
    req.user = await UserModel.findById(decodedData.id);
  }
  next();
});
exports.isPlayerAuthenticateUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.PlayerToken;
  if (!token) {
    return next(new ErrorHandler("No Data Availabe", 401));
  }
  const decodedData = jwt.verify(token, JWTSecret);
  req.player = await PlayerModel.findById(decodedData.id);

  next();
});
exports.isOrgAuthenticateUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.Org;
  if (!token) {
    return next(new ErrorHandler("No Data Availabe", 401));
  }
  const decodedData = jwt.verify(token, JWTSecret);
  req.org = await PlayerModel.findById(decodedData.id);

  next();
});
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not Allowed to use this resource`,
          400
        )
      );
    }
    next();
  };
};
