const Post = require("../models/post.model");

exports.getPostController = async (req,res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();

        res.status(200).json({
            success:true,
            data:posts,
            message:"Entire posts Data is fetched",
        });
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.message,
        })
    }
}