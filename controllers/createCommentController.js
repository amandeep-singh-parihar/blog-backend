//import model
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

//business logic
exports.createCommentController = async (req, res) => {
  try {
    //fetch data from request body
    const { post, user, body } = req.body;
    //create a comment object

    // if (!post || !user || !body) {
    //   return res
    //     .status(400)
    //     .json({ error: "Post ID, user ID, and body are required" });
    // }

    const comment = new Comment({
      post,
      user,
      body,
    });

    // save the new comment into the database
    const savedComment = await comment.save();

    //find the post by ID , add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    ).populate("comments")
    .exec();
    // the actual document which belongs to the id we can get it using .populate()
    // $push operator is used to update the entry
    // $pull operator is used to deleted the entry
    res.status(200).json({
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error while Creating comment",
    });
  }
};
