const { OragnizationModel } = require("../Models/Organization.Model");
const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("../Middleware/catch.Async.error");
const sendOrgToken = require("../Utils/Send.Organization");
// Creating Org
const registerOrg = catchAsyncError(async (req, res, next) => {
  const { OrganizationName, ReplyEmail, Location, Language, TimeZone } =
    req.body;
  const Org = await OragnizationModel.create({
    OrganizationName,
    ReplyEmail,
    Location,
    Language,
    TimeZone,
  });
  sendOrgToken(Org, 201, res);
});
// Login Org
const loginOrg = catchAsyncError(async (req, res, next) => {
  const { ReplyEmail, OrganizationName } = req.body;
  if (!ReplyEmail || !OrganizationName) {
    return next(
      new ErrorHandler("Please Enter ReplyEmail & OrganizationName", 400)
    );
  }
  const Org = await OragnizationModel.findOne({ email });
  if (!Org) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }
  sendOrgToken(Org, 200, res);
});

const Logout = catchAsyncError(async (req, res, next) => {
  res.cookie("Org", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    message: "Logout Succesfull",
  });
});

const getOrgDeteails = catchAsyncError(async (req, res, next) => {
  const Org = await OragnizationModel.findById(req.org.id);
  res.status(200).json({
    success: true,
    Org,
  });
});

const getAllOrgs = catchAsyncError(async (req, res, next) => {
  const Orgs = await OragnizationModel.find();
  res.status(200).json({
    succes: true,
    Orgs,
  });
});
const getSingleOrg = catchAsyncError(async (req, res, next) => {
  const Orgs = await OragnizationModel.findById(req.params.id);
  if (!Orgs) {
    return next(
      new ErrorHandler(`Org Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    Orgs,
  });
});
const DeleteOrg = catchAsyncError(async (req, res, next) => {
  const Org = await OragnizationModel.findById(req.params.id);
  if (!Org) {
    return next(
      new ErrorHandler(`Org Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await Org.remove();
  res.status(200).json({
    succes: true,
    Org,
  });
});
const updateOrg = catchAsyncError(async (req, res, next) => {
  const { OrganizationName, ReplyEmail, Location, Language, TimeZone } =
    req.body;
  const newOrgData = {
    OrganizationName,
    ReplyEmail,
    Location,
    Language,
    TimeZone,
  };
  const Org = await OragnizationModel.findByIdAndUpdate(
    req.org.id,
    newOrgData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
});
module.exports = {
  registerOrg,
  loginOrg,
  Logout,
  getOrgDeteails,
  getAllOrgs,
  getSingleOrg,
  DeleteOrg,
  updateOrg,
};
