const database = require("../database/models");
const Users = database.Users;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//Controller só para autenticação de usuário;
class AuthController 
{
    static async login(req,res)
    {
        const {email, password} = req.body;

        try{  

        if(!email || !password)
        {
            return res.status(300).json({msg: "Preencha todos os campos obrigatórios"});
        }

        const usuario = await Users.findOne({where:{email:email}}); 
            
        if(!usuario)
        {
            return res.status(404).json({msg: "Usuário não existe!"});
        }

        const verificaPassword = bcrypt.compareSync(password,usuario.password);  

        if(!verificaPassword)
        {
            return res.status(300).json({msg:"Senha incorreta"});
        }

        const user = await Users.findOne({where:{email}});

        const {id, username} = user;
        
        return res.status(202).json({
            usuario: {id, username, email},
            token: jwt.sign({id},process.env.JWT_SECRET,
            {
            expiresIn:'1h',
            })
        })

        }   catch(error)
            { 
                res.status(300).json({msg:error.message})
            }

    }

        static hashDaSenha(pass){
            if(pass==undefined)
            {
                return;
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(pass, salt);
            return hash;
        }
}

module.exports = AuthController;