const Post = require("../models/post.model"); // import the post model
const Comment = require("../models/comment.model"); // import the comment model

// Business logic - it contain what operation will happen if any one hit the route it is mapped with
exports.createCommentController = async (req, res) => {
    try {
        // fetch data from request body
        const { post, user, body } = req.body;

        // if (!post || !user || !body) {
        //     return res
        //         .status(400)
        //         .json({ error: "Post ID, user ID, and body are required" });
        // }

        // create a comment object which contain the data which i fetched from the body in line 8
        const comment = new Comment({
            post,
            user,
            body,
        });

        // This line saves the newly created Comment object to the database
        // The comment.save() method in Mongoose is used to save a new document (in this case, a comment) to the MongoDB database
        const savedComment = await comment.save(); // The result (savedComment) contains the data of the newly saved comment, including the automatically generated _id (because the comment is now saved in the MongoDB database)

        // Find the post by ID , add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(
            // Now that the comment is saved, we want to add it to the post's comments array. The Post.findByIdAndUpdate method does that
            post, // This is the ID of the post you want to update
            // below the comments field in the post model
            // the savedComment._id is the id of the comment document that was just created
            { $push: { comments: savedComment._id } }, // $push is used to add the new comment's _id into the comments array of the corresponding post.
            { new: true } // { new: true } ensures that the updated post is returned after the update.
        )
            .populate("comments") // .populate('fieldName') -> Simple population (populates the referenced documents)
            .exec(); // The .exec() method in Mongoose is used to execute a query
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

/* We can also do this */
// exports.createCommentController = async (req, res) => {
//     try {
//         const { post, user, body } = req.body;

//         const savedComment = await Comment.create({ post, user, body });

//         const updatedPost = await Post.findByIdAndUpdate(
//             post,
//             { $push: { comments: savedComment._id } },
//             { new: true }
//         )
//             .populate("comments")
//             .exec();

//         res.status(200).json({
//             post: updatedPost,
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: "Error while Creating comment",
//         });
//     }
// };
