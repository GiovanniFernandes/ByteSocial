const {Router} = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth')

const router = Router();

router
.get('/user/:id',auth,UserController.pegaUsuarioEspecifico)
.get('/Users', auth, UserController.pegaTodosUsuarios)

.post('/cadastro', UserController.criaUsuario)
.post('/login', UserController.login)
.post('/validate', UserController.validateToken)

.put('/user/:id', UserController.alteraUsuario)
.put('/user/senha/:id', UserController.alteraSenha)

.delete('/user/:id', UserController.deletaUsuario)


module.exports = router;