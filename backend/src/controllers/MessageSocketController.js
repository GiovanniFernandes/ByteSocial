const MessageController = require('../controllers/MessageController.js');

class MessageSocketController {
  constructor(io) {
    this.io = io;
    this.connectedUsers = [];
    this.handleConnection();
  }
  
  handleConnection() {
    this.io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      this.handleDisconnect(socket);

      socket.on('add-user', ({ userId, username }) => {
        !this.connectedUsers.some((user) => user.userId === userId) &&
          this.connectedUsers.push({ userId, socketID: socket.id });
        socket.data.username = username;
        this.io.emit('get-users', this.connectedUsers);
      });
      
      socket.on('send-message', async ({ senderId, receiverId, message }) => {
        try {
          const savedMessage = await MessageController.enviarMensagem(receiverId, senderId, message);
          //armazena o id do socket do usuário que recebeu a mensagem
          const receiverSockets = this.connectedUsers.filter((user) => user.userId === receiverId).map((user) => user.socketID);
          console.log(receiverSockets);
          if (receiverSockets) {
            socket.to(receiverSockets).emit('new-message', {
              authorId: senderId,
              author: socket.data.username,
              savedMessage
            });
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
  }

  handleDisconnect(socket) {
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);

      // atualiza a lista sem o usuário que se desconectou
      this.connectedUsers = this.connectedUsers.filter((user) => user.socketID !== socket.id)
    });
  }
}

module.exports = MessageSocketController;