const mongoose = require("mongoose"); // import the mongoose as this model is going to save in the mongodb

/* Creating the like schema which comprises of 
  post -> This field contains a reference (ObjectId) to a Post document
  user -> This field contains a String representing the user who liked the post.
  
  **simply we can say that at which post the user likes**
*/
const likeSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId, // The ref: "Post" indicates that this field will store the ID of a document in the Post collection.
            ref: "Post",
        },
        user: {
            type: String, // In your current schema, you're storing the user as a string, which could be the user's id or some other unique identifier for the user.
            required: true,
        },
    },
    { timestamps: true }
);

// exporting the model
module.exports = mongoose.model("Like", likeSchema);
