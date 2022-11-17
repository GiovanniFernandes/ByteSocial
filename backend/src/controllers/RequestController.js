const database = require ("../database/models");
const Users = database.Users;
const Connections = database.Connections;

class RequestController {
    static async sendRequest(req,res)
    {
        try {
            const{username} = req.params; //Pode fazer com id se o front preferir
            const id = req.user_id;
            const usuarioReq = await Users.findOne({where:{username}});
            if(!usuarioReq) return res.status(404).json({msg:"Usuário não existe"})

            if(usuarioReq.id==id)return res.status(405).json({msg:"Você não mandar solicitação para si mesmo"})

            //Verificando se já foi enviada ou se você já é amigo desse usuário

            const buscaUser = await Connections.findOne({where:{user1_id:id, user2_id:usuarioReq.id}});
            const buscaEmUser = await Connections.findOne({where:{user1_id:usuarioReq.id, user2_id:id}}); 
            if(buscaUser && buscaEmUser) return res.status(400).json({msg:"Você já é amigo desse usuario"})        
            if(buscaUser) return res.status(400).json({msg:"Você já enviou a solicitação"});

            const requestSent = await Connections.create({user1_id:id, user2_id:usuarioReq.id});
            return res.status(201).json({msg:"Solicitação enviada com sucesso!"});

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async rejectRequest(req,res)
    {
        try {
            const{username} = req.params; //Pode fazer com id se o front preferir
            const id = req.user_id;

            const usuarioReq = await Users.findOne({where:{username}});
            if(!usuarioReq) return res.status(404).json({msg:"Usuário não existe"})

            const buscaUser = await Connections.findOne({where:{user1_id:id, user2_id:usuarioReq.id}});
            const buscaEmUser = await Connections.findOne({where:{user1_id:usuarioReq.id, user2_id:id}});

            if(!buscaUser&&!buscaEmUser) return res.status(400).json({msg:"Solicitação não existe"});

            if(!buscaUser&&buscaEmUser){
                const requestRejected = await Connections.destroy({where:{user1_id:usuarioReq.id, user2_id:id}});
                return res.status(202).json({msg:"Solicitação rejeitada"});
            }
            if(buscaUser&&buscaEmUser) return res.status(400).json({msg:"Esse usuário já é seu amigo!"});

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async acceptRequest(req,res)
    {
        //Adicionar amigo, basicamente aceita a solicitação e cria uma conexão entre você e outro usuário
        try {
            const{username} = req.params; //Pode fazer com id se o front preferir
            const id = req.user_id;

            const usuarioReq = await Users.findOne({where:{username}});
            if(!usuarioReq) return res.status(404).json({msg:"Usuário não existe"})

            const buscaUser = await Connections.findOne({where:{user1_id:id, user2_id:usuarioReq.id}});
            const buscaEmUser = await Connections.findOne({where:{user1_id:usuarioReq.id, user2_id:id}});

            if(!buscaUser&&!buscaEmUser) return res.status(400).json({msg:"Solicitação não existe"});

            if(!buscaUser&&buscaEmUser){
                const requestAccepted = await Connections.create({user1_id:id, user2_id:usuarioReq.id});
                return res.status(201).json({msg:"Solicitação aceita!"});
            }

            if(buscaUser&&buscaEmUser) return res.status(400).json({msg:"Esse usuário já é seu amigo!"});

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelRequest(req,res)
    {
        try {
            const{username} = req.params; //Pode fazer com id se o front preferir
            const id = req.user_id;

            const usuarioReq = await Users.findOne({where:{username}});
            if(!usuarioReq) return res.status(404).json({msg:"Usuário não existe"})

            const buscaUser = await Connections.findOne({where:{user1_id:id, user2_id:usuarioReq.id}});
            const buscaEmUser = await Connections.findOne({where:{user1_id:usuarioReq.id, user2_id:id}});

            if(!buscaUser&&!buscaEmUser) return res.status(400).json({msg:"Você não enviou essa solicitação"});

            if(!buscaEmUser&&buscaUser){
                const cancelledReq = await Connections.destroy({where:{user1_id:id, user2_id:usuarioReq.id}});
                return res.status(202).json({msg:"Solicitação Cancelada!"});
            }
            if(buscaUser&&buscaEmUser) return res.status(400).json({msg:"Esse usuário já é seu amigo!"});


        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async showRequests(req,res)
    {
        try {
            const id = req.user_id;

            const pSolicit = await Connections.findAll({where:{user2_id:id}});
            const pSent = await Connections.findAll({where:{user1_id:id}});

            let requests = [];

            for(let i=0; i<pSolicit.length; i++)
            {
                for(let j=0; j<pSent.length; j++)
                {
                    if(pSolicit[i].user1_id==pSent[j].user2_id && pSolicit[i].user2_id==pSent[j].user1_id )
                    {
                        pSolicit[i]=0;
                    }
                }
            }

            for(let i=0; i<pSolicit.length; i++)
            {
                if(pSolicit[i]!=0)
                {   
                    let usuario = await Users.findOne({where:{id:pSolicit[i].user1_id}})
                    requests.push(usuario)
                }
            }

            if(requests.length==0) return res.status(200).json({msg:"Você não possui nenhuma solicitação de conexão."});

            requests.forEach(user=>{
                if(user.password!=undefined || user.email!=undefined)
                    {
                        user.password=undefined;
                        user.email=undefined;
                    }
            })

            return res.status(200).json({requests});
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = RequestController;







