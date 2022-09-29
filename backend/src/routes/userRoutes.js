const {Router} = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth')

const router = Router();

router
.get('/user/:id',auth,UserController.pegaUsuarioEspecifico)
.get('/Users',auth, UserController.pegaTodosUsuarios)

.post('/cadastro', UserController.criaUsuario)
.post('/auth/login', AuthController.login)

.put('/user/:id',auth, UserController.alteraUsuario)
.put('/user/pass/:id',auth, UserController.alteraSenha)

.delete('/user/:id',auth, UserController.deletaUsuario)

module.exports = router;