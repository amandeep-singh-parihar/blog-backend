const Like = require("../models/like.model"); // import the like model
const Post = require("../models/post.model"); // import the post model

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body; // retriving the post and user from the request body
        const like = new Like({
            // creating a object named like with the retriving data post and user
            post,
            user,
        });

        const savedLike = await like.save(); // Saves the like object to the database and stores the result in savedLike

        const updatedPost = await Post.findByIdAndUpdate(
            post, // This is the ID of the post you want to update
            { $push: { likes: savedLike._id } }, // $push is used to add the new like's _id into the likes array of the corresponding post.
            { new: true }
        )
            .populate("likes") // .populate('fieldName') -> Simple population (populates the referenced documents)
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
        const { post, like } = req.body; // retriving the post and like from the request body
        // find and delete the like
        const deletedLike = await Like.findOneAndDelete({
            /* 
            Like.findOneAndDelete(): This method is used to find a single like document that matches the given post and like ID, and then delete it from the database.
            */
            post: post, // post: post -> It ensures that the like belongs to the correct post.
            _id: like, // _id: like -> It ensures that the like being deleted matches the provided like ID.
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
