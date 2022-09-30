const database = require ("../database/models");
const Users = database.Users;
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config();

class UserController {


    static async criaUsuario (req,res){

        const {username,password,email} = req.body;

        const hash = UserController.hashDaSenha(password);        

        try{ 

            const novoUsuario = await Users.findOrCreate({where:{email},
                defaults: {
                    username, email, password:hash
                }
            });
            return res.status(201).json(novoUsuario);

        } catch (errors){
            return res.status(500).json(errors.message);
        }

    }

    static async pegaUsuarioEspecifico (req,res){

        const {id} = req.params;

        try{
            const usuario = await Users.findOne(
                { where: { id   : Number(id) }})

            if(usuario)
                return res.status(200).json(usuario);
            return res.status(404).json({msg:"usuario não localizado"}); 

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async pegaTodosUsuarios (req,res){
        
        try{
            const usuarios = await Users.findAll();
            return res.status(200).json(usuarios);
        }catch (errors){
            return res.status(500).json(errors.message)
        }
    }
    
    static async alteraUsuario (req,res){
    
        const {id} = req.params;
        const novosDados = req.body;

        try{
            const atualizou = await Users.update(novosDados, 
                { where: { id : Number(id)} });

            const usuarioAtualizado = await Users.findOne 
            ({ where: { id : Number(id)} });   

            return res.status(200).json({usuarioAtualizado, atualizou})

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async alteraSenha (req, res){ 

        const {id} = req.params;
        const {password, newPassword} = req.body;

        try{

            const usuario = await Users.findOne({where:{id: Number(id)}});
            const verificaSenha = bcrypt.compareSync(senha,usuario.password);  
            
            if(!verificaSenha)
                return res.status(300).json({msg:"senha atual incorreta", verificaSenha});
            
            const hash = UserController.hashDaSenha(newPassword);
            const atualizou = await Users.update({password:hash}, 
                { where: { id : Number(id)} });

            const usuarioAtualizado = await Users.findOne 
            ({ where: { id : Number(id)} });   

            return res.status(200).json({usuarioAtualizado, atualizou})

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async deletaUsuario (req,res) {

        const {id} = req.params;

        try{
            const deletou = await Users.destroy({where:{ id: Number(id) }});
            return res.status(200).json({msg:`id ${id} removido`});

        } catch (errors){
            return res.status(500).json(errors.message)
        }


    }


    static async login (req,res) {
        const {email,password} = req.body;

        try{  

            if(!email || !password )
                return res.status(300).json({msg: "Email e password são obrigatórios"});

            const usuario = await Users.findOne({where:{email}});
            
            if(!usuario)
                return res.status(404).json({msg: "usuario não encontrado", usuario });
            
            const verificaPassword = bcrypt.compareSync(password,usuario.password);  
            
            if(!verificaPassword)
                return res.status(300).json({msg:"senha incorreta", verificaPassword});

            jwt.sign({id: usuario.id},process.env.JWT_SECRET, (err,token)=> {

                    if(err)
                        return res.status(500).json({error: err}, {msg: "Erro interno"});

                    return res.status(200).json({token:token}); 
                })    
                    

        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    
    static hashDaSenha(senha){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);
        return hash;
    }

}



module.exports = UserController;