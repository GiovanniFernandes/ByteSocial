const {Router} = require('express');
const LikesController = require('../controllers/LikeController.js');
const auth = require('../middlewares/auth')
const router = Router();

router
.post("/like/:post_id",auth,LikesController.darRetirarLike)
.get("/post/likes/:post_id", auth, LikesController.showLikes);
module.exports = router;