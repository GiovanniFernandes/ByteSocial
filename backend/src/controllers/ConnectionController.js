const database = require ("../database/models");
const Users = database.Users;
const Connections = database.Connections;

class ConnectionController 
{

    static async deleteFriendship(req,res)
    {
        const{username} = req.params; //Pode fazer com id se o front preferir
        const id = req.user_id;
        const usuarioReq = await Users.findOne({where:{username}});

        if(!usuarioReq) return res.status(404).json({msg:"Usuário não existe"})

        const buscaUser = await Connections.findOne({where:{user1_id:id, user2_id:usuarioReq.id}});

        const buscaEmUser = await Connections.findOne({where:{user1_id:usuarioReq.id, user2_id:id}});

        if(!buscaUser&&!buscaEmUser) return res.status(400).json({msg:"Você não tem vínculo algum com esse usuário"});

            if(!buscaEmUser&&buscaUser){
                const cancelledReq = await Connections.destroy({where:{user1_id:id, user2_id:usuarioReq.id}});
                return res.status(202).json({msg:"Solicitação Cancelada!"});
            }
            
            if(buscaUser&&buscaEmUser)
            {
                const finishFriendship1 = await Connections.destroy({where:{user1_id:id, user2_id:usuarioReq.id}});
                const finishFriendship2 = await Connections.destroy({where:{user1_id:usuarioReq.id, user2_id:id}});
                return res.status(202).json({msg:"Usuário deletado da sua lista de amigos!"});
            }

    }

    static async showConnections(req,res)
    {

        const id = req.user_id;

        const pSolicit = await Connections.findAll({where:{user2_id:id}});
        const pSent = await Connections.findAll({where:{user1_id:id}});

            
            let connections = []; //array de ids dos usuários que são suas conexões

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

            let conexoes = []

            for(let i=0; i<connections.length; i++)
            {
                let usuario = await Users.findOne({where:{id:connections[i]}})
                
                conexoes.push(usuario);
            }

            conexoes.forEach(user=>{
                if(user.password!=undefined || user.email!=undefined)
                    {
                        user.password=undefined;
                        user.email=undefined;
                    }
            })

            return res.status(200).json({Connections:conexoes});
    }

}

module.exports = ConnectionController;