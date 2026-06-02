const Post = require("../models/Post");
const { errorHandler } = require("../auth");

module.exports.addPost = async (req, res) => {
	try{
		let newPost = new Post({
			title: req.body.title,
			content: req.body.content,
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

module.exports.viewAllPosts = async (req, res) => {
	try{
		const result = await Post.find({}).populate('author', 'firstName lastName')

		return res.status(200).send({
			message: "Successfully read all posts",
			result: result
		})
	} catch(error){
		errorHandler(error, req, res)
	}
}

module.exports.viewPost = async (req, res) => {
	try{
		const result = await Post.findById(req.params.postId).populate('author', 'firstName lastName');

		if(!result){
			return res.status(404).send({
				message: "Post not found"
			})
		}

		return res.status(200).send({
			message: "Post found",
			result: result
		})
	} catch(error) {
		errorHandler(error, req, res)
	}
}

module.exports.editPost = async (req, res) => {
	try{
		const targetPost = await Post.findById(req.params.postId);

		if(!targetPost){
			return res.status(404).send({
				message: "Post not found"
			})
		}

		if((req.user.id !== targetPost.author.toString()) && (!req.user.isAdmin)){
			return res.status(401).send({
				message: "Unauthorized to edit post"
			})
		}

		let updatedPost = {
			title: req.body.title,
			content: req.body.content,
			author: req.user.id,
			creation_date: targetPost.creation_date
		}

		const updated = await Post.findByIdAndUpdate(req.params.postId, updatedPost, { new: true });
		return res.status(200).send({
			message: "Post updated",
			result: updated
		})

	} catch(error) {
		errorHandler(error, req, res)
	}
}

module.exports.deletePost = async (req, res) => {
	try{
		const targetPost = await Post.findById(req.params.postId);

		if(!targetPost){
			return res.status(404).send({
				message: "Post not found"
			})
		}

		await Post.findByIdAndDelete(req.params.postId);

		return res.status(200).send({
			message: "Successfully deleted post"
		})
	} catch(error){
		errorHandler(error, req, res)
	}
}

