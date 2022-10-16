const database = require ("../database/models");
const Users = database.Users;
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config();

class AuthController 
{
    static async login(req,res)
    {
        const {email, password} = req.body;
        try{  
        if(!email||!password) return res.status(300).json({msg: "Preencha todos os campos obrigatórios"});
        
        const usuario = await Users.findOne({where:{email}}); 
            
        if(!usuario) return res.status(404).json({msg: "Usuário não existe!"});
        
        const verificaPassword = bcrypt.compareSync(password,usuario.password);  

        if(!verificaPassword) return res.status(300).json({msg:"Senha incorreta"});

        const {id, username} = usuario;
        
        return res.status(202).json({
            usuario: {id, username, email},
            token: jwt.sign({id},process.env.JWT_SECRET,
            {
            expiresIn:'1h',
            })
        })

        } catch(error)
            { 
                res.status(300).json({msg:error.message})
            }
    } 
}

module.exports = AuthController;