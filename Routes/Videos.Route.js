const express = require("express");
const VideoControler = require("../Controllers/Videos.Controller");
const VideoRoute = express.Router();
const {
  isAuthenticateUser,
  authorizeRole,
  isPlayerAuthenticateUser,
  isOrgAuthenticateUser,
} = require("../Middleware/Authentication.js");

VideoRoute.post("/add", VideoControler.AddVideos);
VideoRoute.get("/admin/Videos", VideoControler.getAllVideoss);
VideoRoute.delete(
  "/admin/Video/:id",
  VideoControler.DeleteVideos
);
VideoRoute.put(
  "/admin/Video/:id",
  authorizeRole("admin"),
  VideoControler.updateVideos
);
module.exports = VideoRoute;
