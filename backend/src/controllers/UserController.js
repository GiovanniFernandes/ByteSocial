const database = require ("../database/models");
const Users = database.Users;
const Posts = database.Posts;
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const util = require('util');
const promisify = util.promisify;
require('dotenv').config();

class UserController {

    static async criaUsuario (req,res){

        const {username,password,email} = req.body;
        const userSplit = username.split(" ");        
        
        try{ 
            if(userSplit.length>1) return res.status(300).json({msg:"Escolha um nome de usuário sem espaços.", status:false});
            
            if(!username || !email || !password) return res.status(203).json({msg:"Preencha todos os campos!",status:false});
            
            let emailExists = await UserController.findEmail(email);
            
            let usernameExists = await UserController.findUsername(username);
            
            if(emailExists) return res.status(203).json({msg:"Email já cadastrado!", status:false});

            if(usernameExists) return res.status(203).json({msg:"Username já cadastrado!", status:false});

            if(password.length<6) return res.status(203).json({msg:"A sua senha precisa ter no mínimo 6 caracteres", status:false});
            
        const hash = UserController.hashDaSenha(password);

        const novoUsuario = await Users.findOrCreate({where:{email},
            defaults: {
                    username, email, password:hash
                }
            });

        return res.status(201).json(novoUsuario);

        } catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaUsuarioEspecifico (req,res){
        //Fazer com que os posts apareçam junto ao usuário

        const {usernameParam} = req.params;
        
        try{
            const usuario = await Users.findOne({where:{username:usernameParam}})
            const {id,username, email, createdAt} = usuario;

            const posts = await Posts.findAll({where:{user_id:id}})
            if(posts.length==0) {posts[0]="Esse usuário não possui postagens"};
            if(usuario)return res.status(200).json
            ({
                id,
                username,
                email,
                "Criado em:": createdAt,
                posts
            });
            return res.status(404).json({msg:"Usuario não encontrado"}); 
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async pegaProfile(req,res)
    {
        try {
            const authHeader = req.headers.authorization;
            const [,token] = authHeader.split(" ");
            const {id} = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
            const posts = await Posts.findAll({where:{user_id:id}});
            const {username} = await Users.findOne({where:{id}});
            const qtdPosts = posts.length;
            return res.status(200).json({username, posts:qtdPosts});
            
        } catch (error) {
            return res.status(500).json({msg:error.message});
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

        }catch (errors){
            return res.status(500).json(errors.message)
        }
    }
    
    //Possível alteração futura
    static async alteraUsuario (req,res){
    
        const {username} = req.body;
        const authHeader = req.headers.authorization;
        const [,token] = authHeader.split(" ");
        const {id} = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        try{
            const userExists = await Users.findOne({where:{username}});
            const yourUser = await Users.findOne({where:{id}});
            if(username==yourUser.username) return res.status(203).json({msg:"Esse já é o seu username"});
            if(userExists) return res.status(203).json({msg:"Usuário já cadastrado!"});

            const atualizou = await Users.update({username},{where:{id}});
            const usuarioAtualizado = await Users.findOne({where:{id}});   
            return res.status(200).json({usuarioAtualizado, atualizou})
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async alteraSenha (req, res){ 

        const {password, newPassword} = req.body;
        const authHeader = req.headers.authorization;
        const [,token] = authHeader.split(" ");
        const {id} = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        try{
            const usuario = await Users.findOne({where:{id}});
            const verificaSenha = bcrypt.compareSync(password,usuario.password);  
            
            if(!verificaSenha)
                return res.status(300).json({msg:"senha atual incorreta", verificaSenha});
            
            const hash = UserController.hashDaSenha(newPassword);
            const atualizou = await Users.update({password:hash},{where:{id}});

            const usuarioAtualizado = await Users.findOne({where:{id}});   

            return res.status(200).json({usuarioAtualizado, atualizou})

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async deletaUsuario (req,res) {

        const {id} = req.params;

        try{
            const deletou = await Users.destroy({where:{id}});
            return res.status(200).json({msg:`id ${id} removido`});

        } catch (errors){
            return res.status(500).json(errors.message)
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
                return false;
            }
    }

    static async findUsername(username)
    {
        try 
        {
            const usuarios = await Users.findAll({where:{username}});
            if(usuarios.length>0)
            {
            return true;
            }
            return false;
            
        }catch (error) 
            {
                return false;
            }
    }
}



module.exports = UserController;