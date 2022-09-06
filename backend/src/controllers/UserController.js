const database = require ("../database/models");
//const us = database.Users;
const bcrypt = require('bcrypt');

class UserController {


    static async criaUsuario (req,res){

        const {nome,senha,email} = req.body;

        //const hash = UserController.hashDaSenha(senha);
        
        /*
        Melhor procurar, fazer a verificação, e criar o usuario
        ou deixar assim com um único acesso ao BD.
    
        não sei o por quê, mas ele entra no default, mesmo localizando um usuario, 
        então a função de hash fora dou dentro do default da no mesmo. 
        
        Decisão pode ser verificada observando o tempo 
        */

        try{ 

            const usuario = await database.Users.findOne({where: {email:email}})

            const novoUsuario = await database.Users.findOrCreate({
                where:{email:email},
                defaults: {
                    nome, email, senha:UserController.hashDaSenha(senha)
                }
            })
            
            return res.status(201).json(novoUsuario);

        } catch (errors){
            return res.status(500).json(errors.message)
        }

    }

    static async pegaUsuarioEspecifico (req,res){

        const {id} = req.params;

        try{
            const usuario = await database.Users.findOne(
                { where: { id: Number(id) }})

            if(usuario)
                return res.status(200).json(usuario);
            return res.status(404).json({msg:"usuario não localizado"}); 

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async pegaTodosUsuarios (req,res){
        
        try{
            const usuarios = await database.Users.findAll();
            return res.status(200).json(usuarios);
        }catch (errors){
            return res.status(500).json(errors.message)
        }
    }
    
    static async alteraUsuario (req,res){
    
        const {id} = req.params;
        const novosDados = req.body;

        try{
            const atualizou = await database.Users.update(novosDados, 
                { where: { id : Number(id)} });

            const usuarioAtualizado = await database.Users.findOne 
            ({ where: { id : Number(id)} });   

            return res.status(200).json({usuarioAtualizado, atualizou})

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async alteraSenha (req, res){ 

        const {id} = req.params;
        const {senha, novaSenha} = req.body;

        try{

            const usuario = await database.Users.findOne({where:{id: Number(id)}});
            
            const verificaSenha = bcrypt.compareSync(senha,usuario.senha);  
            
            if(!verificaSenha)
                return res.status(300).json({msg:"senha atual incorreta", verificaSenha});
            
            const hash = UserController.hashDaSenha(novaSenha);

            const atualizou = await database.Users.update({senha:hash}, 
                { where: { id : Number(id)} });

            const usuarioAtualizado = await database.Users.findOne 
            ({ where: { id : Number(id)} });   

            return res.status(200).json({usuarioAtualizado, atualizou})

        } catch (errors){
            return res.status(500).json(errors.message)
        }
    }

    static async deletaUsuario (req,res) {

        const {id} = req.params;

        try{
            const deletou = await database.Users.destroy({where:{id:Number(id)}});
            return res.status(200).json({msg:`id ${id} removido`});

        } catch (errors){
            return res.status(500).json(errors.message)
        }


    }


    static async login (req,res) {
        const {email,senha} = req.body;

        try{

            const usuario = await database.Users.findOne({where:{email}});
            
            if(!usuario)
                return res.status(404).json({msg: "usuario não encontrado", usuario });
            
            const verificaSenha = bcrypt.compareSync(senha,usuario.senha);  
            
            if(!verificaSenha)
                return res.status(300).json({msg:"senha incorreta", verificaSenha});
                    
            return res.status(200).json(usuario);

        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    
    static hashDaSenha(senha){
        const salt = bcrypt.genSaltSync(10); // deixei em 1 para deixar rápido - não recomendado
        //const salt = 12; - tempo grande para um i5
        const hash = bcrypt.hashSync(senha, salt);
        return hash;
    }

}



module.exports = UserController;