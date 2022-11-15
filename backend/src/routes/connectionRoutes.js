const {Router} = require('express');
const RequestController = require("../controllers/ConnectionController.js");
const auth = require('../middlewares/auth')
const router = Router();

router
.delete("/connection/:username", RequestController.deleteFriendship)
.get("/connections", RequestController.showConnections)

module.exports = router;