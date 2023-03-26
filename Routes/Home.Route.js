const express = require("express");
const path = require("path");
const HomeRoute = express.Router();
const app = express();
const {
  isAuthenticateUser,
  authorizeRole,
  isOrgAuthenticateUser,
  isPlayerAuthenticateUser,
} = require("../Middleware/Authentication.js");
const Auth = require("../Middleware/Auth.js");

HomeRoute.get(
  "/Teams",
  isAuthenticateUser,
  app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd/Teams"))))
);
HomeRoute.get(
  "/Videos",
  isAuthenticateUser,
  app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd/Videos"))))
);
HomeRoute.get(
  "/News",
  isAuthenticateUser,
  app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd/News"))))
);
HomeRoute.get(
  "/Login",
  isAuthenticateUser,
  app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd/Login"))))
);
HomeRoute.get(
  "/SignUp",
  app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd/SignUp"))))
);
HomeRoute.get(
  "/Edit-User",
  app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd/Edit"))))
);
HomeRoute.get("/User-Profile", (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) {
    res.redirect("http://localhost:3000/");
  } else {
    app.use(
        express.static(path.resolve(path.join(__dirname, "../FrontEnd/pr33urjndjkwuiiJO#*joed98wjroujowifjsiufjowfu8j*U(Oj98Uj(*u9DJOFSJDIFUSDIFUHSDIFSDHIFHSDIFUHE7WE8")))
      );
      res.send("Please Login");
  }
});
HomeRoute.get(
  "/Player",
  isAuthenticateUser,
  app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd/Player"))))
);
module.exports = HomeRoute;
