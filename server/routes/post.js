const express = require("express");
const postController = require("../controllers/post");
const { verify, verifyAdmin } = require("../auth");

const Router = express.Router();

Router.post("/", verify, postController.addPost);

Router.get("/", verify, postController.viewAllPosts);

Router.get("/:postId", verify, postController.viewPost);

Router.patch("/:postId", verify, postController.editPost);

Router.delete("/:postId", verify, verifyAdmin, postController.deletePost);

module.exports = Router;

