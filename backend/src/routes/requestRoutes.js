const {Router} = require('express');
const RequestController = require("../controllers/RequestController.js");
const auth = require('../middlewares/auth')
const router = Router();

router
.get("/requests", auth, RequestController.showRequests)
.post("/request/:username",auth,RequestController.sendRequest)
.post("/request/accept/:username", auth, RequestController.acceptRequest)
.delete("/request/reject/:username",auth,RequestController.rejectRequest)
.delete("/request/cancel/:username", auth, RequestController.cancelRequest)

module.exports = router;