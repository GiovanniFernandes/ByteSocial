const MessageController = require('../controllers/MessageController.js');
const ConnectionController = require('../controllers/ConnectionController.js')

class MessageSocketController {
  constructor(io) {
    this.io = io;
    this.connectedUsers = new Map();
    this.handleConnection();
  }
  
  handleConnection() {
    this.io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      this.handleDisconnect(socket);

      socket.on('add-user', ({ userId }) => {
        this.connectedUsers.set(userId, socket.id);
        socket.data.userId = userId;
      });
      
      socket.on('send-message', async ({ senderId, receiverId, message }) => {
        try {
          const isFriend = await ConnectionController.friendshipVerification(senderId, receiverId);
          const savedMessage = await MessageController.enviarMensagem(receiverId, senderId, message);
          
          //armazena o id do socket do usuário que recebeu a mensagem
          const receiverSockets = this.connectedUsers.get(receiverId);
          if (receiverSockets) {
            socket.to(receiverSockets).emit('new-message', {
              authorId: senderId,
              savedMessage
            });
          }
        } catch (error) {
          socket.emit('error', error.message);
        }
      });
    });
  }

  handleDisconnect(socket) {
    socket.on('disconnect', () => {
      const userData = this.connectedUsers.get(socket.data.userId)

      if (userData){
        console.log(`Socket disconnected: ${socket.id}`)
        this.connectedUsers.delete(socket.data.userId)
      }
      
    });
  }
}

module.exports = MessageSocketController;