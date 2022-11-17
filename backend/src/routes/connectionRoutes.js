const {Router} = require('express');
const RequestController = require("../controllers/ConnectionController.js");
const auth = require('../middlewares/auth')
const router = Router();

router
.delete("/connection/:username",auth, RequestController.deleteFriendship)
.get("/connections",auth, RequestController.showConnections)

module.exports = router;