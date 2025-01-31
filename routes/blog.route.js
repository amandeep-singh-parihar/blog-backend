const express = require("express"); // import the express
const router = express.Router();    // import the express Router

//import controller
const { createCommentController } = require("../controllers/createCommentController");
const { createPostController } = require("../controllers/createPostController");
const { likePost , unlikePost } = require("../controllers/likeController");
const { getPostController } = require("../controllers/getPostController")


//mapping
router.post("/comments/create", createCommentController);
router.post("/posts/create",createPostController);
router.get("/posts",getPostController);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);


//export
module.exports = router;