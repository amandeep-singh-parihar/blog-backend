const Like = require("../models/like.model");
const Post = require("../models/post.model");

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;
        const like = new Like({
            post,
            user,
        });

        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true }
        )
            .populate("likes")
            .exec();

        res.status(200).json({
            post: updatedPost,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error while liking post",
        });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;
        //find and delete the like collection me se
        const deletedLike = await Like.findOneAndDelete({
            post: post,
            _id: like,
        });

        //update the post collection
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: deletedLike._id } },
            { new: true }
        );

        res.json({
            post: updatedPost,
        });
    } catch (error) {
        res.status(400).json({
            error: "Error while unliking post",
        });
    }
};
