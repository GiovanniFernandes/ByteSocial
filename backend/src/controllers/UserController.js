const database = require ("../database/models");
const Users = database.Users;
const Posts = database.Posts;
const Likes = database.Likes;
const Connections = database.Connections;
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

        const {usernameParam} = req.params;
        
        try{
            const usuario = await Users.findOne({where:{username:usernameParam}})
            const {id,username, email, createdAt} = usuario;

            const posts = await Posts.findAll({where:{user_id:id}})
            if(posts.length==0) res.status(200).json({username,
                "Criado em ": createdAt,
                qtdPosts:posts.length,
                posts:"Usuário não possui posts",
                });

            if(usuario) return res.status(200).json
            ({
                username,
                "Criado em ": createdAt,
                qtdPosts:posts.length,
                posts,
                message
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
            

            const pSolicit = await Connections.findAll({where:{user2_id:id}});
            const pSent = await Connections.findAll({where:{user1_id:id}});

            let requests = [];
            let connections = [];

            for(let i=0; i<pSolicit.length; i++)
            {
                for(let j=0; j<pSent.length; j++)
                {
                    if(pSolicit[i].user1_id==pSent[j].user2_id && pSolicit[i].user2_id==pSent[j].user1_id )
                    {
                        connections.push(pSent[j].user2_id);
                        pSolicit[i]=0;
                    }
                }
            }
            for(let i=0; i<pSolicit.length; i++)
            {
                if(pSolicit[i]!=0)
                {
                    requests.push(pSolicit[i])
                }
            }
            return res.status(200).json({username,
                qtdPosts:posts.length,
                 posts,
                  connections:connections.length,
                   requests:requests.length
                });

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

            
            const atualizaUser = await Users.update({username},{where:{id}});
            const usuarioAtualizado = await Users.findOne({where:{id}});   

            const likes = await Likes.findAll({where:{user_id:id}});

            for(let i=0; i<likes.length; i++)
            {
                const atualizaEmLike = Likes.update({username},{where:{user_id:id}});
            }

            return res.status(200).json({usuarioAtualizado, atualizaUser})

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
                return res.status(300).json({msg:"Senha atual incorreta", verificaSenha});
            
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