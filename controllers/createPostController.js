const Post = require("../models/post.model"); // import the post model

// Business logic - it contain what operation will happen if any one hit the route, it is mapped with
exports.createPostController = async (req, res) => {
    try {
        const { title, body, likes, comments } = req.body; // retrive the title, body, like, comments from request body
        const response = await Post.create({ title, body, likes, comments }); // creating the response object having the title , body , likes, comments which we retiver above

        res.status(200).json({
            success: true,
            data: response, // sending the data
            message: "entry create successfully",
        });
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
