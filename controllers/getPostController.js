const Post = require("../models/post.model"); // importing the model which we want to use

// Business logic - it contain what operation will happen if any one hit the route it is mapped with
exports.getPostController = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("likes")
            .populate("comments")
            .exec();
        /* Post.find():
        This finds all documents in the posts collection and returns them.
        It retrieves the posts but without any related data (like comments or likes) at this point.

        populate("likes"):
        The populate() method is used to automatically replace the likes field (which contains ObjectIds referencing the Like model) with the actual data from the likes collection.
        Essentially, this replaces the likes field (which would just be an array of Like object IDs) with the full Like documents.

        populate("comments"):
        Similarly, this will replace the comments field in each post with the full Comment documents from the comments collection, instead of just showing an array of Comment ObjectIds.
        
        exec():
        exec() executes the query and returns a promise, allowing you to use await to handle the result asynchronously.
        This is an explicit way of running the query, though it’s optional (Mongoose will execute the query even without exec()). */
        res.status(200).json({
            success: true,
            data: posts, // the data in the response
            message: "Entire posts Data is fetched",
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
