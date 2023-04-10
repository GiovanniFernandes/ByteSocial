const {Router} = require('express');
const RequestController = require("../controllers/RequestController.js");
const auth = require('../middlewares/auth')
const router = Router();

router
.get("/requests", auth, RequestController.showRequests)
.post("/request/:id",auth,RequestController.sendRequest)
.post("/request/accept/:id", auth, RequestController.acceptRequest)
.delete("/request/reject/:id",auth,RequestController.rejectRequest)
.delete("/request/cancel/:id", auth, RequestController.cancelRequest)

module.exports = router;