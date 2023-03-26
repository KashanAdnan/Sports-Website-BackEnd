const { TeamsModel } = require("../Models/Teams.Model");
const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("../Middleware/catch.Async.error");
const sendToken = require("../Utils/Send.Token");
// Creating Teams
const AddTeams = catchAsyncError(async (req, res, next) => {
  const { TeamN, Flag, ranking } = req.body;
  const Teams = await TeamsModel.create({
    TeamN: TeamN,
    Flag: Flag,
    ranking: ranking,
  });
  res.status(201).send({
    Teams,
  });
});

const uprankingTeams = catchAsyncError(async (req, res, next) => {
  const { TeamN, Flag } = req.body;
  const newTeamsData = {
    TeamN: TeamN,
    Flag: Flag,
  };
  const Teams = await TeamsModel.findByIdAndUpranking(
    req.params.id,
    newTeamsData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    succes: true,
    Teams,
  });
});
const getAllTeams = catchAsyncError(async (req, res, next) => {
  const Teams = await TeamsModel.find();
  res.status(200).json({
    succes: true,
    Teams,
  });
});
const getSingleTeams = catchAsyncError(async (req, res, next) => {
  const Teams = await TeamsModel.findById(req.params.id);
  if (!Teams) {
    return next(
      new ErrorHandler(`Teams Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    Teams,
  });
});
const DeleteTeams = catchAsyncError(async (req, res, next) => {
  const Teams = await TeamsModel.findById(req.params.id);
  if (!Teams) {
    return next(
      new ErrorHandler(`Teams Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await Teams.remove();
  res.status(200).json({
    succes: true,
    Teams,
  });
});
module.exports = {
  AddTeams,
  uprankingTeams,
  getAllTeams,
  getSingleTeams,
  DeleteTeams,
};
