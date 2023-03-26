const express = require("express");
const path = require("path");
const AdminRoute = express.Router();
const app = express();

AdminRoute.get(
  "/admin-get",
  app.use(express.static(path.resolve(path.join(__dirname, "Public/Admin"))))
);
AdminRoute.get(
  "/admin-video",
  app.use(express.static(path.resolve(path.join(__dirname, "Public/Admin"))))
);
module.exports = AdminRoute;
