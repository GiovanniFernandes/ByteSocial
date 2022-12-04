const {Router} = require('express');
const UserController = require('../controllers/UserController.js');
const auth = require('../middlewares/auth')
const router = Router();

router
.get('/user/:usernameParam',auth,UserController.pegaUsuarioEspecifico)
.get('/users', auth, UserController.pegaTodosUsuarios)
.get('/profile',auth, UserController.pegaProfile)

.post('/cadastro', UserController.criaUsuario)

.put('/user/change', auth, UserController.alteraUsuario)
.put('/user/change/pass', auth, UserController.alteraSenha)

//Retirar os parametros de rota
.delete('/user/:id', auth, UserController.deletaUsuario)

module.exports = router;