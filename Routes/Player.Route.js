const express = require("express");
const PlayerControler = require("../Controllers/Player.Controller.js");
const {
  isAuthenticateUser,
  authorizeRole,
  isOrgAuthenticateUser,
  isPlayerAuthenticateUser,
} = require("../Middleware/Authentication.js");
const PlayerRoute = express.Router();

PlayerRoute.post("/register", PlayerControler.registerPlayer);
PlayerRoute.post("/login", PlayerControler.loginPlayer);
PlayerRoute.get("/logout", PlayerControler.Logout);
PlayerRoute.get(
  "/me",
  isPlayerAuthenticateUser,
  PlayerControler.getPlayerDeteails
);
PlayerRoute.put(
  "/me/update",
  isPlayerAuthenticateUser,
  PlayerControler.updatePlayer
);
PlayerRoute.get(
  "/admin/player/:id",
  isPlayerAuthenticateUser,
  PlayerControler.getSinglePlayer
);
PlayerRoute.get(
  "/admin/players",
  isPlayerAuthenticateUser,
  PlayerControler.getAllPlayers
);
PlayerRoute.delete(
  "/admin/player/:id",
  isPlayerAuthenticateUser,
  authorizeRole("admin"),
  PlayerControler.DeletePlayer
);
module.exports = PlayerRoute;
