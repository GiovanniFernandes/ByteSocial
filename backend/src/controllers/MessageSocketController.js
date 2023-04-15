const MessageController = require('../controllers/MessageController.js');

class MessageSocketController {
  //static connectedUsers = new Map();
  constructor(io) {
    this.io = io;
    this.connectedUsers = new Map();
    this.handleConnection();
  }
  
  handleConnection() {
    this.io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      this.handleDisconnect(socket);

      socket.on('add-user', ({ userId, username }) => {
        this.connectedUsers.set(userId, socket.id);
        console.log("ESSE AQUI " + this.connectedUsers.get(userId));
        socket.data.userId = userId;

        /*
        !this.connectedUsers.some((user) => user.userId === userId) &&
          this.connectedUsers.push({ userId, socketID: socket.id });
        socket.data.username = username;
        //this.io.emit('get-users', this.connectedUsers);*/
      });

      async function friendshipVerification(senderId, receiverId){

        //const usuarioReq = await Users.findOne({where:{receiverId}});

        //if(!usuarioReq) return res.status(404).json({msg:"Usuário não existe"})

        const buscaUser = await Connections.findOne({where:{user1_id:senderId, user2_id:receiverId}});

        const buscaEmUser = await Connections.findOne({where:{user1_id:receiverId, user2_id:senderId}});

        if(!buscaUser&&!buscaEmUser) throw new Error("Você não tem vínculo algum com esse usuário");
      }
      
      socket.on('send-message', async ({ senderId, receiverId, message }) => {
        try {
          const savedMessage = await MessageController.enviarMensagem(receiverId, senderId, message);
          //armazena o id do socket do usuário que recebeu a mensagem
          //const receiverSockets = this.connectedUsers.filter((user) => user.userId === receiverId).map((user) => user.socketID);
          const receiverSockets = this.connectedUsers.get(receiverId);
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
      //this.connectedUsers = this.connectedUsers.filter((user) => user.socketID !== socket.id)
      const userData = this.connectedUsers.get(socket.data.userId)

      if (userData){
        console.log(`Socket disconnected: ${socket.id}`)
        this.connectedUsers.delete(socket.data.userId)
      }
      
    });
  }
}

module.exports = MessageSocketController;