const MessageController = require('../controllers/MessageController.js');

class MessageSocketController {
  constructor(io) {
    this.io = io;
    //this.messageController = new MessageController();
    this.connectedUsers = {};
    this.usersRooms = {};
    this.handleConnection();
  }

  handleConnection() {
    this.io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      this.handleDisconnect(socket);

      socket.on('join', ({ userId }) => {
        this.connectedUsers[socket.id] = userId;
        if (!this.usersRooms[userId]) {
          this.usersRooms[userId] = []; 
        }
        this.usersRooms[userId].push(socket.id);
        console.log(`User ${userId} joined room ${socket.id}`);
      });

      socket.on('send-message', async ({ receiverId, message }) => {
        const senderId = this.connectedUsers[socket.id];
        try {
          const savedMessage = await MessageController.enviarMensagem(receiverId, senderId, message);
          const receiverSockets = this.usersRooms[receiverId];
          console.log(receiverSockets);
          if (receiverSockets) {
            console.log("AQUI!!!")
            receiverSockets.forEach((receiverSocket) => {
              this.io.to(receiverSocket).emit('new-message', savedMessage);
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
      const userId = this.connectedUsers[socket.id];
      if (userId) {
        this.connectedUsers[socket.id] = null;
        const userRooms = this.usersRooms[userId];
        if (userRooms) {
          this.usersRooms[userId] = userRooms.filter((roomId) => roomId !== socket.id);
          if (this.usersRooms[userId].length === 0) {
            this.usersRooms[userId] = null;
          }
        }
      }
    });
  }
}

module.exports = MessageSocketController;




// module.exports = function(io) {
//     io.on('connection', (socket) => {
//       console.log(`User ${socket.id} connected`);
      
//       // Escuta o evento de envio de mensagem privada
//       socket.on('private message', async ({ sender, receiver, message }) => {
//         const newMessage = new Messages({
//           sender,
//           receiver,
//           message,
//           timestamp: new Date(),
//         });
  
//         await newMessage.save();
  
//         // Emite um evento para o receptor da mensagem
//         io.to(receiver).emit('private message', newMessage);
  
//         // Emite um evento para o remetente da mensagem
//         io.to(sender).emit('private message', newMessage);
//       });
//     });
// }