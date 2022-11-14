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

        if(!email||!password) 
        return res.status(300).json({msg: "Preencha todos os campos obrigatórios", status: false});
        
        const usuario = await Users.findOne({where:{email}}); 
            
        if(!usuario) 
        return res.status(404).json({msg: "Usuário não existe!", status:false} );
        
        const verificaPassword = bcrypt.compareSync(password,usuario.password);  

        if(!verificaPassword) 
        return res.status(300).json({msg:"Senha incorreta", status:false});

        const {id, username} = usuario;
            
        const token  = jwt.sign({id},process.env.JWT_SECRET, { expiresIn:'1h',})
        
        return res.status(202).json({ 
            user: {id, username}, 
            token, 
            status: true });

        } catch(error)
            { 
                res.status(300).json({msg:error.message})
            }
    } 

    static validateToken (req,res) {
        const {token} = req.body;

        try{  

            if(token === undefined)
                return res.status(203).json({msg: "token não identificado", status:false});
            
                
            jwt.verify(token, process.env.JWT_SECRET, (err,data) => {
        
                if(err)
                    return res.status(203).json({err:"falha na autenticação do token", status:false});
                return res.status(200).json({user: data.id, status: true})  
            });                    

        }catch(error){
            return res.status(500).json(error.message);
        }
    }

}

module.exports = AuthController;