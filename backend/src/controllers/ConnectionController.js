const database = require ("../database/models");
const Users = database.Users;
const Connections = database.Connections;
const { Op } = require('sequelize');

class ConnectionController 
{

    static async deleteFriendship(req,res)
    {
        const { id } = req.params;
        const userId = req.user_id;
        const userReq = await Users.findOne({where:{id}});

        if(!userReq) return res.status(404).json({msg:"Usuário não existe"})
        if(userReq.id==userId) return res.status(400).json({msg:"Ooops, parece que você se equivocou..."}) 
        
        const connection1 = await Connections.findOne({
            where: {
                user1_id: id,
                user2_id: userId,
                isStatus: true
            }
        })

        if(connection1){
            await Connections.destroy({
                where: {
                    user1_id: id,
                    user2_id: userId
                }
            })

            return res.status(202).json({msg: "Usuário deletado da sua lista de amigos!"});
        }

        const connection2 = await Connections.findOne({
            where: {
                user1_id: userId,
                user2_id: id,
                isStatus: true
            }
        })
       
        if(connection2){
            await Connections.destroy({
                where: {
                    user1_id: userId,
                    user2_id: id
                }
            })

            return res.status(202).json({msg: "Usuário deletado da sua lista de amigos!"});
        }

        return res.status(400).json({msg: "Você não tem vínculo algum com esse usuário"});

    }

    static async showConnections(req,res)
    {
        try {
            const id = req.user_id;
            let user;
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