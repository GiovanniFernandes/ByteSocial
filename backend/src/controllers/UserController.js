const database = require ("../database/models");
const Users = database.Users;
const bcrypt = require('bcrypt');
require('dotenv').config();

class UserController {

    static async criaUsuario (req,res){

        const {username,password,email} = req.body;
        const hash = UserController.hashDaSenha(password);        

        try{ 
            const userSplit = username.split(" ");
            if(userSplit.length>1) return res.status(400).json({msg:"Escolha um nome de usuário sem espaços."});
            
            if(!username || !email || !password)
            {
                return res.status(400).json({msg:"Preencha todos os campos!"});
            }

            let emailExists = await UserController.findEmail(email);
            let usernameExists = await UserController.findUsername(username);

            if(emailExists)
            {
                return res.status(406).json({msg:"Email já cadastrado!"});
            }

            else if(usernameExists)
            {
                return res.status(406).json({msg:"Username já cadastrado!"});
            }

            else
            {
                const novoUsuario = await Users.create({username:username, password:hash, email:email});
                return res.status(201).json(novoUsuario);
            }

        }   catch (error)
            {
                return res.status(500).json(error.message);
            }
    }

    static async pegaUsuarioEspecifico (req,res){

        const {id} = req.params;

        try
        {
            const usuario = await Users.findOne({where:{id:Number(id)}});
            const {username, email, qtd_posts, qtd_friends, createdAt, updatedAt} = usuario;
            if(usuario)
            {
                return res.status(200).json({username:username,
                     email:email,
                     qtd_posts:qtd_posts,
                     qtd_friends:qtd_friends,
                     createdAt:createdAt,
                     updatedAt:updatedAt});
            }
            
            else 
            {
                return res.status(404).json({msg:"Usuario não localizado"}); 
            }
                
        }   catch (error)
            {
                return res.status(500).json(error.message)
            }
    }

    static async pegaTodosUsuarios (req,res){
        
        try{
            const usuarios = await Users.findAll();
            usuarios.forEach(user=>
                {
                    if(user.password!=undefined)
                    {
                        user.password=undefined;
                    }
                })
            return res.status(200).json(usuarios);

        }   catch (error)
            {
                return res.status(500).json(error.message)
            }
    }
    
    static async alteraUsuario (req,res){
    
        const {id} = req.params;
        const {novoUsuario} = req.body;
        
        try{
            let usernameExists = await UserController.findUsername(novoUsuario);
            if(usernameExists)
            {
                return res.status(406).json({msg:"Username já cadastrado!"});
            }
            const atualizou = await Users.update({username:novoUsuario},{where:{id:Number(id)}});
            const usuarioAtualizado = await Users.findOne({where:{id:Number(id)}});   

            return res.status(200).json({usuarioAtualizado, atualizou})

        }   catch (error)
            {
                return res.status(500).json(error.message)
            }
    }

    static async alteraSenha (req, res){ 

        const {id} = req.params;
        const {password, newPassword} = req.body;

        try{

            const usuario = await Users.findOne({where:{id:Number(id)}});
            const verificaSenha = bcrypt.compareSync(password,usuario.password); 
            
            if(!verificaSenha)
            {
                return res.status(300).json({msg:"Senha atual incorreta", verificaSenha});
            }

            const hash = UserController.hashDaSenha(newPassword);
            const atualizou = await Users.update({password:hash},{where:{id:Number(id)}});
            const usuarioAtualizado = await Users.findOne({where:{id:Number(id)}});   

            return res.status(200).json({usuarioAtualizado, atualizou})

        }   catch (error)
            {
                return res.status(500).json(error.message);
            }
    }

    static async deletaUsuario (req,res) {

        const {id} = req.params;

        try{
            const deletou = await Users.destroy({where:{ id: Number(id) }});
            console.log(deletou);
            return res.status(200).json({msg:`Usuário de ${id} foi removido com sucesso`});

        }   catch (error)
            {
                return res.status(500).json(error.message)
            }
    }

    static hashDaSenha(pass){
        if(!pass)
        {
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        return hash;
    }

    static async findEmail(email)
    {
    try {
        const usuarios = await Users.findAll({where:{email}});
        if(usuarios.length>0)
        {
        return true;
        }
        return false;
        
    }   catch (error) 
        {
            res.status(500).json(error.message);   
            return false;
        }
    }

    static async findUsername(username)
    {
        try {
            const usuarios = await Users.findAll({where:{username}});
            if(usuarios.length>0)
            {
            return true;
            }
            return false;
            
        }   catch (error) 
            {
                res.status(500).json(error.message);   
                return false;
            }
    }
}

module.exports = UserController;