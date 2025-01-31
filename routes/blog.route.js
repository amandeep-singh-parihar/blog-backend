const express = require("express");
const router = express.Router();

//import controller
const { createCommentController } = require("../controllers/createCommentController");
const { postController } = require("../controllers/postController");
const { likeController } = require("../controllers/likeController");
const { getPostController } = require("../controllers/getPostController")


//mapping
router.post("/comments/create", createCommentController);
router.post("/posts/create",postController);
router.get("/posts",getPostController);
router.post("/likes/like",likeController);


//export
module.exports = router;