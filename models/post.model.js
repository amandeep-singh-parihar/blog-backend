const mongoose = require("mongoose"); // import the mongoose as this model is going to save in the mongodb

/* Creating the post schema (blog schema) which comprises of 
  title -> title of the blog
  body -> body of the scehma (content inside it)
  likes -> This field contains an array of ObjectIds, each representing a like on the post
  comments -> Similar to the likes field, the comments field is an array of ObjectIds
*/
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            require: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId, // Each ObjectId in the likes array references a document in the Like collection.
                ref: "Like",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId, // Each ObjectId in this array references a document in the Comment collection.
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

// exports the model
module.exports = mongoose.model("Post", postSchema);
