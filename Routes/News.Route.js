const express = require("express");
const NewsControler = require("../Controllers/News.Controller");
const NewsRoute = express.Router();
const {
  isAuthenticateUser,
  authorizeRole,
  isPlayerAuthenticateUser,
  isOrgAuthenticateUser,
} = require("../Middleware/Authentication.js");

NewsRoute.post("/add", NewsControler.AddNews);
NewsRoute.get("/admin/Newss", NewsControler.getAllNewss);
NewsRoute.delete("/admin/News/:id", NewsControler.DeleteNews);
NewsRoute.put(
  "/admin/News/:id",
  authorizeRole("admin"),
  NewsControler.updateNews
);
module.exports = NewsRoute;
