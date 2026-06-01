const express = require("express");
const userController = require("../controllers/user");
const { verify, verifyAdmin } = require("../auth");

const Router = express.Router();

Router.post("/register", userController.registerUser);

Router.post("/login", userController.authenticateUser);

Router.get("/details", verify, userController.retrieveUserDetails);

Router.patch("/:id/set-as-admin", verify, verifyAdmin, userController.updateUserAsAdmin);

Router.patch("/update-password", verify, userController.updatePassword);

module.exports = Router;