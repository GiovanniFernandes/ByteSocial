const {Router} = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router
.get('/user/:id',UserController.pegaUsuarioEspecifico)
.get('/Users',UserController.pegaTodosUsuarios)

.post('/cadastro', UserController.criaUsuario)
.post('/login', UserController.login)

.put('/user/:id', UserController.alteraUsuario)
.put('/user/senha/:id', UserController.alteraSenha)

.delete('/user/:id', UserController.deletaUsuario)


module.exports = router;