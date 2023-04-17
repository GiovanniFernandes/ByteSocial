const database = require("../database/models");
const { Messages, Users} = database;

const jwt = require ('jsonwebtoken');
const { Sequelize } = require('sequelize');

class MessageController {
  // static async enviarMensagem(req, res) {
  //   try {
  //     const { receiver_id } = req.params;
  //     const { sender_id, message } = req.body;
  //     const timestamp = new Date();

  //     if (!message) {
  //       return res.status(400).json({ erro: 'Escreva uma mensagem antes de enviar' });
  //     }
  //     if (!sender_id || !receiver_id) {
  //       return res
  //         .status(400)
  //         .json({ error: "Os campos sender_id e receiver_id são obrigatórios" });
  //     }

  //     const mensagem = await Messages.create({ sender_id, receiver_id, message, timestamp });
  //     return res.status(201).json(mensagem);
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   } 
  // }

  static async enviarMensagem(receiver_id, sender_id, message) {
    try {
      const timestamp = new Date();

      if (!message) {
        throw new Error("Escreva uma mensagem antes de enviar");
      }
      if (!sender_id || !receiver_id) {
        throw new Error("Os campos sender_id e receiver_id são obrigatórios");
      }

      const mensagem = await Messages.create({ sender_id, receiver_id, message, timestamp });
      return mensagem;
    } catch (error) {
      // Captura da resposta de erro do banco de dados
      if (error.original) {
        console.log(`Erro do banco de dados: ${error.original.message}`);
      }
      throw error;
    }
  }

   static async getConversations(req, res){
    //Pegando o Id do usuário através do token
    const id = req.user_id;
    let senderId, receiverId, user;

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
      messages.forEach(async message => {
        senderId = message.sender_id;
        receiverId = message.receiver_id;
        const conversation = conversations.find(conv =>
          (conv.senderId === senderId && conv.receiverId === receiverId) ||
          (conv.senderId === receiverId && conv.receiverId === senderId)
        );

        //Ignorar mensagem caso a conversa já exista (Retornará apenas a ultima mensagem de cada conversa)
        if (!conversation) {

          conversations.push({
            senderId,
            receiverId,
            lastMessage: message,
          });
        }
      });

      //Passar o nome do outro usuário da conversa
      const conversationsUser = [];
      for (let i=0; i<conversations.length; i++) {
        conversationsUser.push(conversations[i]);
        if (id === conversations[i].senderId){
          user = await Users.findOne({
            where: {
              id: conversations[i].receiverId 
            },
            attributes: ['id', 'username']
          });
        }

        else if (id === conversations[i].receiverId){
          user = await Users.findOne({
            where: {
              id: conversations[i].senderId
            },
            attributes: ['id', 'username']
          });
        }

        conversationsUser[i].username = user.username;
        conversationsUser[i].userId = user.id;
        delete conversationsUser[i].senderId;
        delete conversationsUser[i].receiverId;
      }

      return res.status(200).json(conversationsUser);

    } catch (error) {
      return res.status(500).json({ "msg" : error.message });
    }
  }
}

module.exports = MessageController;