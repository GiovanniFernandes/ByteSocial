const {Router} = require('express');
const PostController = require("../controllers/PostController.js");
const auth = require('../middlewares/auth')
const router = Router();

router
.get("/post/:post_id", auth,PostController.showPost)
.get("/posts/:offset/:limit", auth, PostController.showPosts)
.post("/publicate",auth,PostController.createPost)
.delete("/posts/:post_id",auth,PostController.deletePost)

module.exports = router;