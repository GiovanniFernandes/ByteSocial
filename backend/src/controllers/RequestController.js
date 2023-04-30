const database = require ("../database/models");
const Users = database.Users;
const Connections = database.Connections;

class RequestController {
    static async sendRequest(req,res)
    {
        try {
            const { id } = req.params;
            const userId = req.user_id;
            
            const userReq = await Users.findOne({where:{id}});
        
            if(!userReq) return res.status(404).json({msg:"Usuário não existe"})

            if(userReq.id==userId)return res.status(405).json({msg:"Você não pode mandar solicitação para si mesmo"})

            const connection = await Connections.findOne({
                where: {
                    user1_id: userId,
                    user2_id: userReq.id
                }
            })

            const connection2 = await Connections.findOne({
                where: {
                    user1_id: userReq.id,
                    user2_id: userId
                }
            })
            
            if (connection2) {
                if (connection2.isStatus) {
                    return res.status(400).json({msg:"Você já é amigo desse usuário"});
                }
                return res.status(400).json({msg:"Você já recebeu solicitação"});
            }

            if (connection) {
                if (!connection.isStatus) {
                    return res.status(400).json({msg:"Você já enviou a solicitação"});
                }
                return res.status(400).json({msg:"Você já é amigo desse usuário"});
            }
            
            const requestSent = await Connections.create({user1_id: userId, user2_id: userReq.id});
            
            return res.status(201).json({requestSent,msg:"Solicitação enviada com sucesso!"});
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async rejectRequest(req,res)
    {
        try {
            const { id } = req.params;
            const userId = req.user_id;

            const userReq = await Users.findOne({where:{id}});
            if(!userReq) return res.status(404).json({msg:"Usuário não existe"})
            if(userReq.id==userId) return res.status(400).json({msg:"Ooops, parece que você se equivocou..."}) 

            const connection = await Connections.findOne({
                where: {
                    user1_id: userReq.id,
                    user2_id: userId
                }
            })

            const connection2 = await Connections.findOne({
                where: {
                    user1_id: userId,
                    user2_id: userReq.id
                }
            })

            if (connection2 && connection2.isStatus) {
                return res.status(400).json({msg:"Esse usuário já é seu amigo!"});
            }

            if (!connection) {
                return res.status(400).json({msg:"Solicitação não existe"});
            }
            
            if (connection.isStatus) {
                return res.status(400).json({msg:"Esse usuário já é seu amigo!"});
            }

            await Connections.destroy({where:{user1_id:userReq.id, user2_id:userId}});

            return res.status(202).json({msg:"Solicitação rejeitada"});

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async acceptRequest(req,res)
    {
        try {
            const{ id } = req.params;
            const userId = req.user_id;

            const userReq = await Users.findOne({where:{id}});
            if(!userReq) return res.status(404).json({msg:"Usuário não existe"})
            if(userReq.id==userId) return res.status(400).json({msg:"Ooops, parece que você se equivocou..."}) 
            
            const connection = await Connections.findOne({
                where: {
                    user1_id: userReq.id,
                    user2_id: userId
                }
            })

            const connection2 = await Connections.findOne({
                where: {
                    user1_id: userId,
                    user2_id: userReq.id
                }
            })

            if (connection2 && connection2.isStatus) {
                return res.status(400).json({msg:"Esse usuário já é seu amigo!"});
            }

            if (!connection) {
                return res.status(400).json({msg:"Solicitação não existe"});
            }

            if (connection.isStatus) {
                return res.status(400).json({msg:"Esse usuário já é seu amigo!"});
            }

            await Connections.update({
                isStatus:1
            },
            {
                where: {
                    user1_id: userReq.id,
                    user2_id: userId
                }
            })

            return res.status(200).json({msg: "Solicitação de amizade aceita!"});
        
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelRequest(req,res)
    {
        try {
            const { id } = req.params; 
            const userId = req.user_id;

            const userReq = await Users.findOne({where:{id}});
            if(!userReq) return res.status(404).json({msg:"Usuário não existe"})
            if(userReq.id==userId) return res.status(400).json({msg:"Ooops, parece que você se equivocou..."}) 
            
            const connection = await Connections.findOne({
                where: {
                    user1_id: userId,
                    user2_id: userReq.id
                }
            })

            if (!connection) {
                return res.status(400).json({msg:"Você não enviou essa solicitação"});
            }

            if (connection.isStatus) {
                return res.status(400).json({msg:"Esse usuário já é seu amigo!"});
            }

            await Connections.destroy({where:{user1_id:userId, user2_id:userReq.id}});
            return res.status(202).json({msg:"Solicitação Cancelada!"});
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async showRequests(req,res)
    {
        try {
            const id = req.user_id;
            
            const requiredReceived = await Users.findOne({
                where:{id:Number(id)},
                include: {
                    model:Users,
                    as: 'user2',
                    through: {
                        where: {
                            isStatus:false
                        },
                        attributes: []
                    },
                    attributes: ['id','username', 'email']
                },
                attributes:[]
            })


            return res.status(200).json(requiredReceived.user2);

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = RequestController;







