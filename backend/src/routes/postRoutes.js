const {Router} = require('express');
const PostController = require("../controllers/PostController.js");
const auth = require('../middlewares/auth')
const router = Router();

router
.post("/publicate",auth,PostController.createPost)
.delete("/posts/:post_id",auth,PostController.deletePost)

module.exports = router;