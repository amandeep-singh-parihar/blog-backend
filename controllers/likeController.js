const Like = require("../models/like.model")
const Post = require("../models/post.model")


exports.likeController = async (req,res) =>{
    try {
        const {post,user} = req.body;
        const like = new Like({
            post,
            user,
        });

        const savedLike = await like.save();

        const updatedLike = await Post.findByIdAndUpdate(
            post,
            {$push: {likes : savedLike._id}},
            {new:true}
        ).populate("likes").exec();

        res.status(200).json({
            post:updatedLike,
        })
    } catch (error) {
        res.status(500).json({
            error:"Error while creating Like",
        })
    }
}