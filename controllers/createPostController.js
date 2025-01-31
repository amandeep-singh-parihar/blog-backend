const Post = require("../models/post.model");

exports.createPostController = async (req, res) => {
    try {
        const { title, body, likes, comments } = req.body;
        const response = await Post.create({ title, body, likes, comments });

        res.status(200).json({
            success: true,
            data: response,
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
