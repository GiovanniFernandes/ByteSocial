const database = require ("../database/models");
const Users = database.Users;
const Posts = database.Posts;
const Likes = database.Likes;
const Connections = database.Connections;
const userService = require("../services/userService.js");
const bcrypt = require("bcrypt");


class UserController {

    static async criaUsuario (req,res){

        const {username,password,email} = req.body;
             
        try{ 
        
            const userSplit = username.split(" ");   
            if(userSplit.length>1) return res.status(300).json({msg:"Não é permitido espaços no seu nome de usuário", status:false});
                
            if(!username || !email || !password) return res.status(203).json({msg:"Preencha todos os campos!",status:false});
            
            let emailExists = await userService.findEmail(email);
            
            let usernameExists = await userService.findUsername(username);
            
            if(emailExists) return res.status(203).json({msg:"Email já cadastrado!", status:false});
    
            if(usernameExists) return res.status(203).json({msg:"Username já cadastrado!", status:false});
    
            if(password.length<6) return res.status(203).json({msg:"A sua senha precisa ter no mínimo 6 caracteres", status:false});
            
        const hash = userService.hashDaSenha(password);
    
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
            const {id,username,createdAt} = usuario;

            const posts = await Posts.findAll({where:{user_id:id}})
            if(posts.length==0) return res.status(200).json({username,
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
            });

            return res.status(404).json({msg:"Usuario não encontrado"}); 
        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async pegaProfile(req,res)
    {
        try {
            const id = req.user_id;
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

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }
    
    static async alteraUsername(req,res){
        const {username} = req.body;
        const id = req.user_id;
        
        try{
            const yourUser = await Users.findOne({where:{id}});
            if(username.trim().toLowerCase() === yourUser.username.trim().toLowerCase()) 
                return res.status(203).json({status:false, msg:"Esse já é o seu username"});
            
            const atualizaUser = await Users.update({username},{where:{id}});
            const usuarioAtualizado = await Users.findOne({where:{id}});   

            //const likes = await Likes.findAll({where:{user_id:id}});
            //const atualizaEmLike = await Likes.update({username},{where:{user_id:id}});

            return res.status(200).json({
                status:true, 
                msg:"Nome atualizado ! ", })

        } catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async alteraEmail (req,res){
    
        const {email} = req.body;
        const id = req.user_id;
        
        try{
            const yourUser = await Users.findOne({where:{id}});
            if(email==yourUser.email) return res.status(203).json({status:false, msg:"Esse já é o seu email"});
            
            const userExists = await Users.findOne({where:{email}});
            if(userExists) return res.status(203).json({status:false, msg:"E mail já utilizado!"});

            
            const atualizaUser = await Users.update({email},{where:{id}});

            //const atualizaEmLike = await Likes.update({email},{where:{user_id:id}});

            return res.status(200).json({
                status:true, 
                msg:"E mail atualizado! ", 
            })

        } catch (error){
            return res.status(500).json(error.message)
        }
    }
    static async alteraSenha (req, res){ 

        const {password, newPassword} = req.body;
        const id = req.user_id;

        try{
           
            const usuario = await Users.findOne({where:{id}});
            const verificaSenha = bcrypt.compareSync(password,usuario.password);  
            
            if(!verificaSenha)
                return res.status(300).json({status:false, msg:"Senha atual incorreta", verificaSenha});
            
            const hash = userService.hashDaSenha(newPassword);
            const atualizou = await Users.update({password:hash},{where:{id}});

            const usuarioAtualizado = await Users.findOne({where:{id}});   

            return res.status(200).json({status:true,msg:"Senha atualizada ", usuarioAtualizado, atualizou})

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async deletaUsuario (req,res) {

        const id = req.user_id ;
        try{
            await Users.destroy({where:{id}});
            return res.status(200).json({msg:`id ${id} removido`});

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

}

module.exports = UserController;