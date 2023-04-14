const {Router} = require('express');
const UserController = require('../controllers/UserController.js');
const auth = require('../middlewares/auth')
const router = Router();

router
.get('/user/:id',auth,UserController.pegaUsuarioEspecifico)
.get('/users', auth, UserController.pegaTodosUsuarios)
.get('/profile/:id/:offset', auth, UserController.pegaProfile)

.post('/cadastro', UserController.criaUsuario)

.put('/user/change/username', auth, UserController.alteraUsername)
.put('/user/change/pass', auth, UserController.alteraSenha)
.put('/user/change/email', auth, UserController.alteraEmail)

.delete('/user', auth, UserController.deletaUsuario)

module.exports = router;