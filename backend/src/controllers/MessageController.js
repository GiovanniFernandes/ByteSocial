const database = require("../database/models");
const Messages = database.Messages;

class MessageController {
  static async enviarMensagem(req, res) {
    try {
      const { receiver_id } = req.params;
      const { sender_id, texto } = req.body;
      const timestamp = new Date();

      if (!texto) {
        return res.status(400).json({ erro: 'Escreva uma mensagem antes de enviar' });
      }
      if (!sender_id || !receiver_id) {
        return res
          .status(400)
          .json({ error: "Os campos sender_id e receiver_id são obrigatórios" });
      }

      const mensagem = await Messages.create({ sender_id, receiver_id, message: texto, timestamp });
      return res.status(201).json(mensagem);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = MessageController;