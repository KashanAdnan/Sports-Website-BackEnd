const { PlayerModel } = require("../Models/Player.Model");
const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("../Middleware/catch.Async.error");
const sendPlayerToken = require("../Utils/Send.Player.Token");
// Creating Player
const registerPlayer = catchAsyncError(async (req, res, next) => {
  const {
    playerName,
    playerImage,
    CaptainName,
    CompanyName,
    Address,
    City,
    State,
    Zip,
    Phone,
    Gender,
    DateOfBirth,
    Profashion,
    Hand,
  } = req.body;
  PlayerModel;
  const Player = await PlayerModel.create({
    playerName,
    playerImage,
    CaptainName,
    Profashion,
    CompanyName,
    Address,
    City,
    State,
    Zip,
    Phone,
    Gender,
    DateOfBirth,
    Hand,
  });
  sendPlayerToken(Player, 201, res);
});

// Login Player
const loginPlayer = catchAsyncError(async (req, res, next) => {
  const { playerName, email } = req.body;
  if (!email || !playerName) {
    return next(new ErrorHandler("Please Enter Email & PLayer Name", 400));
  }
  const Player = await PlayerModel.findOne({ email });
  if (!Player) {
    return next(new ErrorHandler("Invalid email or Player Name", 401));
  }
  sendPlayerToken(Player, 200, res);
});

const Logout = catchAsyncError(async (req, res, next) => {
  res.cookie("PlayerToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    message: "Logout Succesfull",
  });
});
const getPlayerDeteails = catchAsyncError(async (req, res, next) => {
  const Player = await PlayerModel.findById(req.player.id);
  res.status(200).json({
    success: true,
    Player,
  });
});

const updatePlayer = catchAsyncError(async (req, res, next) => {
  const { PLayer, Team, Payment } = req.body;
  const newPlayerData = {
    PLayer,
    Team,
    Payment,
  };
  const Player = await PlayerModel.findByIdAndUpdate(
    req.player.id,
    newPlayerData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    succes: true,
    Player,
  });
});
const getAllPlayers = catchAsyncError(async (req, res, next) => {
  const Players = await PlayerModel.find();
  res.status(200).json({
    succes: true,
    Players,
  });
});
const getSinglePlayer = catchAsyncError(async (req, res, next) => {
  const Players = await PlayerModel.findById(req.params.id);
  if (!Players) {
    return next(
      new ErrorHandler(`Player Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    Players,
  });
});

const DeletePlayer = catchAsyncError(async (req, res, next) => {
  const Player = await PlayerModel.findById(req.params.id);
  if (!Player) {
    return next(
      new ErrorHandler(`Player Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await Player.remove();
  res.status(200).json({
    succes: true,
    Player,
  });
});
module.exports = {
  registerPlayer,
  loginPlayer,
  Logout,
  getPlayerDeteails,
  updatePlayer,
  getAllPlayers,
  getSinglePlayer,
  DeletePlayer,
};
