const mongoose = require("mongoose"); // import the mongoose as this model is going to save in the mongodb

/* Creating the comment schema which comprises of 
  post -> at which post we commment
  user -> which user do the comment
  body -> what the user comments
*/
const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId, // id of the post model
            ref: "Post",
        },
        user: {
            type: String, // user's name
            require: true,
        },
        body: {
            type: String, // comment's body
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema); //exporting the schema
