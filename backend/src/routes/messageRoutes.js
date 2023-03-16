const {Router} = require('express');
const MessageController = require('../controllers/MessageController.js');
const auth = require('../middlewares/auth')
const router = Router();

router
.post('/message/send/:receiver_id', MessageController.enviarMensagem)


module.exports = router;