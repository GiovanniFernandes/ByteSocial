const database = require ("../database/models");
const Users = database.Users;
const Connections = database.Connections;
const { Op } = require('sequelize');

class ConnectionController 
{

    static async deleteFriendship(req,res)
    {
        const { id } = req.params; //Pode fazer com id se o front preferir
        const userId = req.user_id;
        const userReq = await Users.findOne({where:{id}});

        if(!userReq) return res.status(404).json({msg:"Usuário não existe"})
        if(userReq.id==userId) return res.status(400).json({msg:"Ooops, parece que você se equivocou..."}) 


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
        try {
            const id = req.user_id;
            let user, friendId;
            const connections = await Connections.findAll({
                where:{
                    [Op.or]:[
                        {   user1_id: id    },
                        {   user2_id: id    }
                    ],
                    isStatus:true
                }
            })

            const contactList = [];

            for(let i=0; i<connections.length; i++) {
                if (id === connections[i].user1_id) {
                    user = await Users.findOne({
                        where: {
                          id: connections[i].user2_id 
                        },
                        attributes: ['id', 'username']
                    });
                }

                else if (id === connections[i].user2_id) {
                    user = await Users.findOne({
                        where: {
                          id: connections[i].user1_id 
                        },
                        attributes: ['id', 'username']
                    });
                }
                contactList.push(user);
            }

            return res.status(200).json(contactList);
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
        
    }

}

module.exports = ConnectionController;