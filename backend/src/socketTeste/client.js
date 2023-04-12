// Importa o socket.io-client e o pacote node-fetch para fazer requisições HTTP
const io = require("socket.io-client");

const socket = io.connect("http://localhost:3021");

socket.on("connect", () => {
  console.log("Conectado com sucesso!");
});

//join room
socket.emit("add-user", {userId: 7, username: "Ronaldo"});

socket.on("get-users", async (data) => {
    console.log(data)
  });

async function sendMessage(senderId, receiverId, message) {
  try {
    await socket.emit("send-message", { senderId, receiverId, message });
  } catch (error) {
    console.error(`Erro ao enviar mensagem para ${receiverId}: ${error}`);
  }
}

socket.on("new-message", async (data) => {
  console.log("Nova mensagem recebida:", { author: data.author, message: data.savedMessage.message });
});

sendMessage(7, 8, "Olá, 8!");
