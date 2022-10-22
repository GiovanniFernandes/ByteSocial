const {Router}= require("express");
const AuthController = require("../controllers/AuthController.js");

const router = Router();
router
.post('/login', AuthController.login)
.post('/validate',AuthController.validateToken)

module.exports = router;