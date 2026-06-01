const express = require("express");
const userController = require("../controllers/user");
const { verify, verifyAdmin } = require("../auth");

router.post("/", verify, postController.addPost);