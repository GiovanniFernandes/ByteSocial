const {Router} = require('express');
const RequestController = require("../controllers/RequestController.js");
const auth = require('../middlewares/auth')
const router = Router();

router
.post("/request/:username",auth,RequestController.sendRequest)
.post("/request/accept/:username", auth, RequestController.acceptRequest)
.delete("/request/reject/:username",auth,RequestController.rejectRequest)
.delete("/request/cancel/:username", auth, RequestController.cancelRequest)


module.exports = router;