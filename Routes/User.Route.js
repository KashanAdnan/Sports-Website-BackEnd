const express = require("express");
const UserControler = require("../Controllers/User.Controller.js");
const {
  isAuthenticateUser,
  authorizeRole,
  isPlayerAuthenticateUser,
  isOrgAuthenticateUser,
} = require("../Middleware/Authentication.js");
const UserRoute = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/Public/userImages"));
  },
  filename: function () {
    const name = Date.now() + "-" + file.orignalname;
    cb(null,name)
  },
});

const upload = multer({storage : storage})
UserRoute.post("/register", upload.single('image') ,  UserControler.registerUser);
UserRoute.post("/login", UserControler.loginUser);
UserRoute.post("/password/forgot", UserControler.forgetPassword);
UserRoute.put("/password/reset/:token", UserControler.resetPassword);
UserRoute.get("/logout", UserControler.Logout);
UserRoute.get("/me", isAuthenticateUser, UserControler.getUserDeteails);
UserRoute.put(
  "/password/update",
  isAuthenticateUser,
  UserControler.updatePassword
);
UserRoute.put("/me/update", isAuthenticateUser, UserControler.updateUser);
UserRoute.get(
  "/admin/user/:id",
  isAuthenticateUser,
  authorizeRole("admin"),
  UserControler.getSingleUser
);
UserRoute.get(
  "/admin/users",
  isAuthenticateUser,
  authorizeRole("admin"),
  UserControler.getAllUsers
);
UserRoute.delete(
  "/admin/user/:id",
  isAuthenticateUser,
  authorizeRole("admin"),
  UserControler.DeleteUser
);
UserRoute.put(
  "/admin/user/:id",
  isAuthenticateUser,
  authorizeRole("admin"),
  UserControler.updateRole
);
module.exports = UserRoute;
