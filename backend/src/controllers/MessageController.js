const database = require("../database/models");
const Messages = database.Messages;
const jwt = require ('jsonwebtoken');
const { Sequelize } = require('sequelize');

class MessageController {
  static async enviarMensagem(req, res) {
    try {
      const { receiver_id } = req.params;
      const { sender_id, message } = req.body;
      const timestamp = new Date();

      if (!message) {
        return res.status(400).json({ erro: 'Escreva uma mensagem antes de enviar' });
      }
      if (!sender_id || !receiver_id) {
        return res
          .status(400)
          .json({ error: "Os campos sender_id e receiver_id são obrigatórios" });
      }

      const mensagem = await Messages.create({ sender_id, receiver_id, message, timestamp });
      return res.status(201).json(mensagem);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    } 
  }

   static async getConversations(req, res){
    //Pegando o Id do usuário através do token
    const authHeader = req.headers.authorization;
        const parts = authHeader.split(" ")
        const [, token] = parts;
        const {id} = jwt.decode(token);

    try {
      const messages = await Messages.findAll({
        // Retornando todas as mensagens onde o usuário se encontra no receiverId ou senderId (Ordem decrescente)
        order: [
          ['createdAt', 'DESC']
        ],
        where: Sequelize.or(
          { sender_id: id },
          { receiver_id: id }
        )
      });

      if (!messages){
        throw new Error();
      }

      
      //Criando array de conversas
      const conversations = [];
      
      //Iterando cada mensagem e separando em conversas
      messages.forEach(message => {
        const senderId = message.sender_id;
        const receiverId = message.receiver_id;
        const conversation = conversations.find(conv =>
          (conv.senderId === senderId && conv.receiverId === receiverId) ||
          (conv.senderId === receiverId && conv.receiverId === senderId)
        );

        //Ignorar mensagem caso a conversa já exista (Retornará apenas a ultima mensagem de cada conversa)
        if (!conversation) {   
          conversations.push({
            senderId,
            receiverId,
            sender: message.sender,
            receiver: message.receiver,
            messages: [message],
          });
        }
      });
      
      return res.status(200).json(conversations);

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = MessageController;