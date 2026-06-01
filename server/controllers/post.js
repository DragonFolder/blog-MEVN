const Post = require("../models/Post");
const { errorHandler } = require("../auth");

module.exports.addPost = async (req, res) => {
	try{
		let newPost = new Post({
			title: req.body.title,
			content: req.body.content,
			information: req.body.information,
			author: req.user.id
		});

		const result = await newPost.save();

		return res.status(201).send({
			message: "Successfully created post",
			result: result
		})
	} catch (error){
		errorHandler(error, req, res)
	}
}