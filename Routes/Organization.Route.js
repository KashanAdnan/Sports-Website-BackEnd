const express = require("express");
const OrganizationController = require("../Controllers/Organization.Controller");
const OrgRoute = express.Router()
const {
  isAuthenticateOrg,
  authorizeRole,
  isPlayerAuthenticateOrg,
  isOrgAuthenticateUser,
} = require("../Middleware/Authentication.js");

OrgRoute.post("/register", OrganizationController.registerOrg);
OrgRoute.post("/login", OrganizationController.loginOrg);
OrgRoute.get("/logout", OrganizationController.Logout);
OrgRoute.get("/me", isOrgAuthenticateUser, OrganizationController.getOrgDeteails);
OrgRoute.put("/me/update", isOrgAuthenticateUser, OrganizationController.updateOrg);
OrgRoute.get(
  "/admin/Org/:id",
  isOrgAuthenticateUser,
  authorizeRole("admin"),
  OrganizationController.getSingleOrg
);
OrgRoute.get(
  "/admin/org",
  isOrgAuthenticateUser,
  OrganizationController.getAllOrgs
);
OrgRoute.delete(
  "/admin/Org/:id",
  isOrgAuthenticateUser,
  authorizeRole("admin"),
  OrganizationController.DeleteOrg
);

module.exports = OrgRoute;
